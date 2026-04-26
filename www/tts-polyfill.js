/* ============================================================================
 * tts-polyfill.js
 *
 * Android's WebView (used by Capacitor, Cordova, React Native WebView) does
 * NOT implement `window.speechSynthesis` — it's intentionally omitted by
 * Chromium. This shim fills the gap by using the native Android TextToSpeech
 * API via the @capacitor-community/text-to-speech plugin.
 *
 * Load order: include this BEFORE narrator.js.
 * No-op on platforms where speechSynthesis already works (iOS, desktop Chrome,
 * mobile Chrome, Safari iOS).
 * ========================================================================= */
(function () {
  'use strict';

  // If the browser already has a real speechSynthesis, stand down.
  if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
    return;
  }

  // Are we running inside Capacitor with the TextToSpeech plugin available?
  var Capacitor = window.Capacitor;
  var hasCapacitor = !!(Capacitor && Capacitor.Plugins && Capacitor.Plugins.TextToSpeech);
  if (!hasCapacitor) {
    // Nothing we can do. Leave speechSynthesis undefined so callers can detect.
    console.warn('[tts-polyfill] No speechSynthesis and no Capacitor TextToSpeech plugin — narrator will stay silent.');
    return;
  }

  var TTS = Capacitor.Plugins.TextToSpeech;

  // ---------------------------------------------------------------- voices
  var _voices = [];
  var _voicesLoaded = false;
  var _voiceschangedListeners = [];

  function _mapPluginVoice(v) {
    // Plugin returns { voiceURI, name, lang, localService, default, gender }
    return {
      voiceURI: v.voiceURI || v.name || '',
      name: v.name || v.voiceURI || 'voice',
      lang: v.lang || '',
      localService: v.localService !== false,
      default: !!v.default,
    };
  }

  function _loadVoices() {
    return TTS.getSupportedVoices().then(function (resp) {
      var list = (resp && resp.voices) ? resp.voices : [];
      _voices = list.map(_mapPluginVoice);
      _voicesLoaded = true;
      // Fire voiceschanged listeners
      try {
        if (typeof synth.onvoiceschanged === 'function') synth.onvoiceschanged();
        _voiceschangedListeners.forEach(function (fn) {
          try { fn(); } catch (e) {}
        });
      } catch (e) {}
      return _voices;
    }).catch(function (e) {
      console.warn('[tts-polyfill] getSupportedVoices failed:', e);
      _voicesLoaded = true;
      return _voices;
    });
  }

  // ---------------------------------------------------------------- utterance
  function SpeechSynthesisUtterance(text) {
    this.text = text || '';
    this.lang = '';
    this.voice = null;
    this.volume = 1;
    this.rate = 1;
    this.pitch = 1;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
    this.onpause = null;
    this.onresume = null;
    this.onmark = null;
    this.onboundary = null;
  }

  // ---------------------------------------------------------------- synth
  var _queue = [];      // pending utterances
  var _current = null;  // currently speaking
  var _cancelling = false;

  function _fire(utt, type, detail) {
    try {
      var cb = utt['on' + type];
      if (typeof cb === 'function') {
        var evt = { type: type, charIndex: 0, elapsedTime: 0, name: '', utterance: utt };
        if (detail) Object.assign(evt, detail);
        cb.call(utt, evt);
      }
    } catch (e) { /* ignore listener errors */ }
  }

  function _next() {
    if (_current) return;
    var utt = _queue.shift();
    if (!utt) return;
    _current = utt;

    var lang = utt.lang || (utt.voice && utt.voice.lang) || 'en-US';
    // Android TTS on many devices uses 'ar' not 'ar-SA'; normalise common cases
    // but also keep the full tag — plugin passes through to Android.
    var opts = {
      text: utt.text || '',
      lang: lang,
      rate: Math.max(0.1, Math.min(2.0, utt.rate || 1.0)),
      pitch: Math.max(0.5, Math.min(2.0, utt.pitch || 1.0)),
      volume: Math.max(0.0, Math.min(1.0, utt.volume == null ? 1.0 : utt.volume)),
      category: 'ambient',  // iOS only; ignored on Android
    };
    if (utt.voice && utt.voice.voiceURI) {
      opts.voice = utt.voice.voiceURI;  // or the index — plugin API accepts both on most versions
    }

    _fire(utt, 'start');

    TTS.speak(opts).then(function () {
      if (!_cancelling) _fire(utt, 'end');
      _current = null;
      _cancelling = false;
      _next();
    }).catch(function (err) {
      console.warn('[tts-polyfill] speak error:', err);
      _fire(utt, 'error', { error: 'synthesis-failed' });
      _current = null;
      _cancelling = false;
      _next();
    });
  }

  var synth = {
    speaking: false,
    pending: false,
    paused: false,
    onvoiceschanged: null,

    speak: function (utt) {
      if (!(utt instanceof SpeechSynthesisUtterance)) {
        console.warn('[tts-polyfill] speak called with non-utterance');
        return;
      }
      _queue.push(utt);
      synth.speaking = true;
      synth.pending = _queue.length > 0;
      _next();
    },

    cancel: function () {
      _cancelling = true;
      _queue.length = 0;
      try { TTS.stop(); } catch (e) {}
      synth.speaking = false;
      synth.pending = false;
    },

    pause: function () {
      // Android plugin has no native pause — treat as cancel + remember we were paused
      // (not strictly correct but avoids hang states)
      synth.paused = true;
    },
    resume: function () {
      synth.paused = false;
    },

    getVoices: function () {
      if (!_voicesLoaded) {
        _loadVoices();   // kick off async load
      }
      return _voices.slice();
    },

    addEventListener: function (type, fn) {
      if (type === 'voiceschanged' && typeof fn === 'function') {
        _voiceschangedListeners.push(fn);
      }
    },
    removeEventListener: function (type, fn) {
      if (type === 'voiceschanged') {
        var i = _voiceschangedListeners.indexOf(fn);
        if (i >= 0) _voiceschangedListeners.splice(i, 1);
      }
    },
  };

  // Keep speaking/pending flags updated based on queue/current
  Object.defineProperty(synth, 'speaking', {
    get: function () { return !!_current || _queue.length > 0; },
    set: function () {},
  });
  Object.defineProperty(synth, 'pending', {
    get: function () { return _queue.length > 0; },
    set: function () {},
  });

  // Expose as globals expected by the Web Speech API
  window.speechSynthesis = synth;
  window.SpeechSynthesisUtterance = SpeechSynthesisUtterance;

  // Prime the voice list so getVoices() returns something on first call.
  // This also triggers onvoiceschanged for consumers like narrator.js.
  if (Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
    // Delay until plugin is ready (Capacitor init sometimes happens just after DOMContentLoaded)
    setTimeout(_loadVoices, 100);
  }

  console.log('[tts-polyfill] installed — using Capacitor TextToSpeech plugin');
})();
