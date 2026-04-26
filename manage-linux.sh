#!/usr/bin/env bash
# ============================================================================
#  Aqidat al-Muslim Android · management console · LINUX
#  Companion script for WORKSHOP.html — check, install, build, test, publish
#  Supports: Debian/Ubuntu (apt), Fedora/RHEL (dnf), Arch (pacman)
# ============================================================================
set -u

# ---------- paths ----------
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANDROID_DIR="$PROJECT_DIR/android"
WWW_DIR="$PROJECT_DIR/www"
SRC_BOOK_DIR="${SRC_BOOK_DIR:-$HOME/koutoub/18-aqidat-al-muslim}"
KEYSTORE_DIR="${KEYSTORE_DIR:-$HOME/.keys}"
KEYSTORE_FILE="${KEYSTORE_FILE:-$KEYSTORE_DIR/wdiy-upload.keystore}"
APP_ID="${APP_ID:-org.workshopdiy.aqidatalmuslim}"
AVD_NAME="${AVD_NAME:-aqidat_al_muslim_test}"

# ---------- detect distro ----------
if   command -v apt-get >/dev/null 2>&1; then PKG_MGR="apt";    PKG_INSTALL="sudo apt-get install -y"
elif command -v dnf     >/dev/null 2>&1; then PKG_MGR="dnf";    PKG_INSTALL="sudo dnf install -y"
elif command -v pacman  >/dev/null 2>&1; then PKG_MGR="pacman"; PKG_INSTALL="sudo pacman -S --noconfirm"
else PKG_MGR="unknown"; PKG_INSTALL="echo manual-install-needed:"; fi

# ---------- discover toolchain ----------
# Prefer Android Studio's embedded JDK if installed
for p in "$HOME/jdk21" "$HOME/jdk17" "$HOME/android-studio/jbr" "/opt/android-studio/jbr" "/usr/local/android-studio/jbr"; do
  [ -d "$p" ] && export JAVA_HOME="$p" && break
done
# Fall back to system JDK (Capacitor 8 needs JDK 21+; JDK 17 may work for older AGP)
if [ -z "${JAVA_HOME:-}" ]; then
  for p in /usr/lib/jvm/java-21-openjdk* /usr/lib/jvm/temurin-21-jdk* \
           /usr/lib/jvm/java-17-openjdk* /usr/lib/jvm/temurin-17-jdk* /usr/lib/jvm/default-java; do
    [ -d "$p" ] && export JAVA_HOME="$p" && break
  done
fi
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export PATH="${JAVA_HOME:+$JAVA_HOME/bin:}$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

# ---------- colors ----------
if [ -t 1 ]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; RESET=$'\033[0m'
  RED=$'\033[31m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'
  BLUE=$'\033[34m'; MAGENTA=$'\033[35m'; CYAN=$'\033[36m'
else
  BOLD=""; DIM=""; RESET=""; RED=""; GREEN=""; YELLOW=""; BLUE=""; MAGENTA=""; CYAN=""
fi

ok()    { printf "  ${GREEN}✓${RESET} %s\n"    "$*"; }
warn()  { printf "  ${YELLOW}!${RESET} %s\n"   "$*"; }
err()   { printf "  ${RED}✗${RESET} %s\n"      "$*"; }
info()  { printf "  ${BLUE}ℹ${RESET} %s\n"     "$*"; }
head1() { printf "\n${BOLD}${MAGENTA}══ %s ══${RESET}\n\n" "$*"; }

confirm() { read -r -p "  ${YELLOW}?${RESET} $* [y/N] " reply; [[ "$reply" =~ ^[Yy]$ ]]; }
pause()   { printf "\n  ${DIM}press Enter to return to the menu${RESET}"; read -r; }
have()    { command -v "$1" >/dev/null 2>&1; }

# ============================================================================
cmd_check() {
  head1 "Environment check (Linux · $PKG_MGR)"

  if have node;  then ok "node    $(node --version)";  else err "node not found — $PKG_INSTALL nodejs npm"; fi
  if have npm;   then ok "npm     $(npm --version)";   else err "npm not found"; fi
  if have git;   then ok "git     $(git --version | awk '{print $3}')"; else err "git not found — $PKG_INSTALL git"; fi
  if have curl;  then ok "curl    $(curl --version | head -1 | awk '{print $2}')"; else warn "curl not found"; fi
  if have unzip; then ok "unzip   present"; else warn "unzip not found — needed for SDK"; fi

  if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/java" ]; then
    ok "java    $("$JAVA_HOME/bin/java" -version 2>&1 | head -1 | cut -d\" -f2) at $JAVA_HOME"
  else
    err "No JDK found — install Android Studio (option 2) or: $PKG_INSTALL openjdk-17-jdk"
  fi

  if have sdkmanager; then ok "sdkmanager  present"; else err "sdkmanager not found — option 2"; fi
  if have adb;        then ok "adb     $(adb --version | head -1 | awk '{print $5}')"; else err "adb not found"; fi
  if have emulator;   then ok "emulator  present"; else err "emulator not found"; fi

  printf "\n  ${DIM}Installed SDK platforms:${RESET}\n"
  if [ -d "$ANDROID_HOME/platforms" ]; then
    ls "$ANDROID_HOME/platforms" 2>/dev/null | sed 's/^/    /'
  else
    err "No SDK platforms installed at $ANDROID_HOME — run option 3"
  fi

  # KVM (emulator acceleration)
  if [ -e /dev/kvm ]; then
    if [ -r /dev/kvm ] && [ -w /dev/kvm ]; then
      ok "KVM accessible (emulator will be fast)"
    else
      warn "KVM exists but not accessible. Add user to kvm group: sudo usermod -aG kvm \$USER (then log out/in)"
    fi
  else
    warn "No /dev/kvm — emulator will be slow (virt-enabled CPU required)"
  fi

  printf "\n  ${DIM}Project status:${RESET}\n"
  [ -f "$PROJECT_DIR/capacitor.config.json" ] && ok "capacitor.config.json present" || warn "no capacitor.config.json"
  [ -d "$PROJECT_DIR/node_modules/@capacitor/cli" ] && ok "capacitor CLI installed" || warn "run: npm install"
  [ -d "$ANDROID_DIR" ] && ok "android/ project present" || warn "run: npx cap add android"
  [ -f "$KEYSTORE_FILE" ] && ok "upload keystore present at $KEYSTORE_FILE" || warn "keystore not created — option 7"
  [ -f "$ANDROID_DIR/keystore.properties" ] && ok "keystore.properties wired" || warn "keystore.properties missing"

  pause
}

# ============================================================================
cmd_install_prereqs() {
  head1 "Install prerequisites (Linux · $PKG_MGR)"

  if [ "$PKG_MGR" = "unknown" ]; then
    err "Unknown package manager. Install manually:"
    info "  - Node.js 18+, npm, git, curl, unzip"
    info "  - OpenJDK 17"
    info "  - Android Studio: https://developer.android.com/studio"
    pause; return
  fi

  info "Will install: nodejs, npm, git, curl, unzip, openjdk-17"
  confirm "Proceed?" || { pause; return; }

  case "$PKG_MGR" in
    apt)    sudo apt-get update && $PKG_INSTALL nodejs npm git curl unzip openjdk-17-jdk ;;
    dnf)    $PKG_INSTALL nodejs npm git curl unzip java-17-openjdk-devel ;;
    pacman) $PKG_INSTALL nodejs npm git curl unzip jdk17-openjdk ;;
  esac

  info ""
  info "Android Studio: download from https://developer.android.com/studio"
  info "Recommended install path: /opt/android-studio or ~/android-studio"
  info "Then run ./studio.sh once to finalize setup."
  info ""
  info "Alternative (command-line only, no GUI IDE):"
  info "  wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"
  info "  mkdir -p $ANDROID_HOME/cmdline-tools && cd \$_ && unzip ~/commandlinetools-linux-*.zip"
  info "  mv cmdline-tools latest"

  pause
}

# ============================================================================
cmd_install_sdk() {
  head1 "Install Android SDK components"

  if ! have sdkmanager; then
    err "sdkmanager not found. Install Android Studio or command-line tools first (option 2)."
    pause; return
  fi

  info "Will install: platform-tools, platforms;android-34, build-tools;34.0.0,"
  info "             emulator, system-images;android-34;google_apis;x86_64"
  confirm "Proceed?" || { pause; return; }

  yes | sdkmanager --licenses >/dev/null 2>&1 || true
  sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
  sdkmanager "emulator" "system-images;android-34;google_apis;x86_64"

  pause
}

# ============================================================================
cmd_sync() {
  head1 "Sync web assets → Android project"
  if [ ! -d "$SRC_BOOK_DIR" ]; then
    err "Source book not found at $SRC_BOOK_DIR"
    info "Set SRC_BOOK_DIR env var to override."
    pause; return
  fi
  info "Source:      $SRC_BOOK_DIR"
  info "Destination: $WWW_DIR/"
  confirm "Copy + sync?" || { pause; return; }
  mkdir -p "$WWW_DIR"
  rsync -a --delete "$SRC_BOOK_DIR/" "$WWW_DIR/"
  ok "Web files copied."
  cd "$PROJECT_DIR"
  [ -d "node_modules/@capacitor/cli" ] || { info "npm install..."; npm install; }
  if [ ! -d "$ANDROID_DIR" ]; then
    info "android/ missing — running 'npx cap add android' first..."
    npx cap add android
    # Idempotently wire signing config so future bundleRelease produces signed AABs
    if [ -x "$PROJECT_DIR/_patch_signing.py" ]; then
      python3 "$PROJECT_DIR/_patch_signing.py" "$ANDROID_DIR/app/build.gradle"
    fi
  fi
  npx cap sync android
  ok "Android project refreshed."
  pause
}

# ============================================================================
cmd_build_debug() {
  head1 "Build debug APK"
  [ -d "$ANDROID_DIR" ] || { err "android/ missing. Run option 4."; pause; return; }
  cd "$ANDROID_DIR"
  echo "sdk.dir=$ANDROID_HOME" > local.properties
  ./gradlew assembleDebug
  local apk="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
  [ -f "$apk" ] && ok "APK: $apk ($(du -h "$apk" | awk '{print $1}'))" || err "APK not produced."
  pause
}

# ============================================================================
cmd_build_release() {
  head1 "Build release AAB"
  [ -d "$ANDROID_DIR" ] || { err "android/ missing."; pause; return; }
  if [ ! -f "$ANDROID_DIR/keystore.properties" ]; then
    warn "keystore.properties missing — AAB will be unsigned."
    confirm "Build unsigned anyway?" || { pause; return; }
  fi
  # Idempotent signing wire-up (no-op if already patched)
  if [ -x "$PROJECT_DIR/_patch_signing.py" ]; then
    python3 "$PROJECT_DIR/_patch_signing.py" "$ANDROID_DIR/app/build.gradle"
  fi
  cd "$ANDROID_DIR"
  echo "sdk.dir=$ANDROID_HOME" > local.properties
  ./gradlew bundleRelease
  local aab="$ANDROID_DIR/app/build/outputs/bundle/release/app-release.aab"
  [ -f "$aab" ] && ok "AAB: $aab ($(du -h "$aab" | awk '{print $1}'))" || err "AAB not produced."
  pause
}

# ============================================================================
cmd_keystore() {
  head1 "Keystore management"
  if [ -f "$KEYSTORE_FILE" ]; then
    ok "Keystore at $KEYSTORE_FILE"
    keytool -list -v -keystore "$KEYSTORE_FILE" -storetype PKCS12 2>/dev/null | grep -E "Alias|Creation|Valid" | sed 's/^/    /' || true
  else
    warn "No keystore at $KEYSTORE_FILE"
    confirm "Create?" || { pause; return; }
    mkdir -p "$KEYSTORE_DIR"; chmod 700 "$KEYSTORE_DIR"
    keytool -genkey -v \
      -keystore "$KEYSTORE_FILE" \
      -alias wdiy \
      -keyalg RSA -keysize 2048 -validity 10000 \
      -storetype PKCS12
    [ -f "$KEYSTORE_FILE" ] && ok "Keystore created. BACK IT UP NOW." || { err "Failed."; pause; return; }
  fi

  if [ ! -f "$ANDROID_DIR/keystore.properties" ]; then
    confirm "Create keystore.properties?" || { pause; return; }
    cat > "$ANDROID_DIR/keystore.properties" <<EOF
storeFile=$KEYSTORE_FILE
storePassword=REPLACE_WITH_YOUR_KEYSTORE_PASSWORD
keyAlias=wdiy
keyPassword=REPLACE_WITH_YOUR_KEY_PASSWORD
EOF
    chmod 600 "$ANDROID_DIR/keystore.properties"
    info "Created. Edit it now."
    ${EDITOR:-nano} "$ANDROID_DIR/keystore.properties"
  else
    ok "keystore.properties exists."
    if grep -q "REPLACE_WITH_YOUR" "$ANDROID_DIR/keystore.properties"; then
      warn "Contains placeholders — edit!"
      confirm "Open editor?" && ${EDITOR:-nano} "$ANDROID_DIR/keystore.properties"
    fi
  fi
  pause
}

# ============================================================================
cmd_avd_create() {
  head1 "Create emulator (AVD)"
  have avdmanager || { err "avdmanager not found."; pause; return; }
  if emulator -list-avds 2>/dev/null | grep -qx "$AVD_NAME"; then
    ok "AVD '$AVD_NAME' exists."; pause; return
  fi
  confirm "Create '$AVD_NAME' (pixel_7, android-34, x86_64)?" || { pause; return; }
  echo no | avdmanager create avd -n "$AVD_NAME" \
    -k "system-images;android-34;google_apis;x86_64" \
    -d "pixel_7"
  emulator -list-avds 2>/dev/null | grep -qx "$AVD_NAME" && ok "AVD created." || err "Creation failed."
  pause
}

# ============================================================================
cmd_emu_start() {
  head1 "Launch emulator"
  if adb devices | grep -q "emulator-"; then ok "Emulator already running."; pause; return; fi
  emulator -list-avds 2>/dev/null | grep -qx "$AVD_NAME" || { err "AVD '$AVD_NAME' missing. Option 8."; pause; return; }
  local kvmflag=""
  [ -r /dev/kvm ] || { warn "No KVM; using software rendering (slow)."; kvmflag="-no-accel"; }
  info "Starting '$AVD_NAME'..."
  (emulator -avd "$AVD_NAME" -no-snapshot -no-audio -no-boot-anim $kvmflag >/tmp/emu.log 2>&1 &)
  adb wait-for-device
  local boot="" tries=0
  while [ "$boot" != "1" ] && [ $tries -lt 30 ]; do
    boot=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    [ "$boot" = "1" ] && break
    sleep 6; tries=$((tries+1)); printf "."
  done
  echo ""
  [ "$boot" = "1" ] && ok "Booted." || err "Timed out — see /tmp/emu.log"
  pause
}

# ============================================================================
cmd_install() {
  head1 "Install APK on device"
  adb devices | tail -n +2 | grep -qv '^$' || { err "No device."; pause; return; }
  local apk="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
  [ -f "$apk" ] || { err "APK missing — option 5."; pause; return; }
  adb devices
  adb install -r "$apk"
  adb shell am start -n "$APP_ID/.MainActivity"
  ok "App launched."
  pause
}

# ============================================================================
cmd_test() {
  head1 "Screenshot current screen"
  adb devices | tail -n +2 | grep -qv '^$' || { err "No device."; pause; return; }
  local out="/tmp/aqidat-al-muslim-$(date +%Y%m%d-%H%M%S).png"
  adb exec-out screencap -p > "$out"
  if [ -s "$out" ]; then
    ok "Saved: $out"
    confirm "Open it?" && (xdg-open "$out" 2>/dev/null || eog "$out" 2>/dev/null || feh "$out" 2>/dev/null || echo "open manually")
  else err "Screenshot failed."; fi
  pause
}

# ============================================================================
cmd_workshop() {
  head1 "Open WORKSHOP.html"
  local html="$PROJECT_DIR/WORKSHOP.html"
  [ -f "$html" ] || { err "Missing."; pause; return; }
  xdg-open "$html" 2>/dev/null || firefox "$html" 2>/dev/null || google-chrome "$html" 2>/dev/null || echo "open $html manually"
  pause
}

# ============================================================================
cmd_git() {
  head1 "Git status"
  [ -d "$PROJECT_DIR/.git" ] || { warn "Not a git repo."; confirm "Init?" && (cd "$PROJECT_DIR" && git init -b main); pause; return; }
  cd "$PROJECT_DIR"
  git log --oneline -5 2>/dev/null | sed 's/^/    /' || true
  echo ""; git status --short
  pause
}

# ============================================================================
cmd_clean() {
  head1 "Clean build artifacts"
  info "Remove: android/app/build/, android/build/, android/.gradle/"
  confirm "Proceed?" || { pause; return; }
  rm -rf "$ANDROID_DIR/app/build" "$ANDROID_DIR/build" "$ANDROID_DIR/.gradle"
  ok "Cleaned."
  pause
}

# ============================================================================
show_menu() {
  clear
  cat <<EOF
${BOLD}${MAGENTA}╔════════════════════════════════════════════════════════════════╗
║   Aqidat al-Muslim Android · management console (Linux · $PKG_MGR)${RESET}${BOLD}${MAGENTA}
║   ${DIM}companion to WORKSHOP.html${RESET}${BOLD}${MAGENTA}
╚════════════════════════════════════════════════════════════════╝${RESET}

  ${BOLD}Project:${RESET} $PROJECT_DIR
  ${BOLD}App id:${RESET}  $APP_ID
  ${BOLD}Source:${RESET}  $SRC_BOOK_DIR

  ${CYAN}-- inspect --${RESET}
    1)  Check environment
   12)  Open WORKSHOP.html
   13)  Git status

  ${CYAN}-- install --${RESET}
    2)  Install prerequisites     ${DIM}(via $PKG_MGR)${RESET}
    3)  Install SDK components

  ${CYAN}-- build --${RESET}
    4)  Sync web app → Android
    5)  Build debug APK
    6)  Build release AAB
   14)  Clean build artifacts

  ${CYAN}-- sign & release --${RESET}
    7)  Keystore management

  ${CYAN}-- test on device --${RESET}
    8)  Create emulator (AVD)
    9)  Launch emulator
   10)  Install APK on device
   11)  Take screenshot

    q)  Quit

EOF
  printf "  ${BOLD}Choose:${RESET} "
}

main() {
  while true; do
    show_menu
    read -r choice
    case "$choice" in
      1) cmd_check ;;          2) cmd_install_prereqs ;;  3) cmd_install_sdk ;;
      4) cmd_sync ;;           5) cmd_build_debug ;;      6) cmd_build_release ;;
      7) cmd_keystore ;;       8) cmd_avd_create ;;       9) cmd_emu_start ;;
     10) cmd_install ;;       11) cmd_test ;;            12) cmd_workshop ;;
     13) cmd_git ;;           14) cmd_clean ;;
      q|Q|exit|quit) echo ""; exit 0 ;;
      *) printf "\n  ${RED}Unknown: %s${RESET}\n" "$choice"; sleep 1 ;;
    esac
  done
}

main "$@"
