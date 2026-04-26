#!/usr/bin/env bash
# ============================================================================
#  Aqidat al-Muslim Android · management console · WINDOWS
#  For git-bash (Git for Windows) OR MSYS2 UCRT64
#  Companion script for WORKSHOP.html
#
#  Run from git-bash or MSYS2-UCRT64 shell:
#    ./manage-windows.sh
# ============================================================================
set -u

# ---------- environment detection ----------
if [ -n "${MSYSTEM:-}" ]; then
  if [ "$MSYSTEM" = "UCRT64" ] || [ "$MSYSTEM" = "MINGW64" ] || [ "$MSYSTEM" = "MINGW32" ]; then
    SHELL_ENV="msys2-$MSYSTEM"
    HAS_PACMAN=1
  elif [ "$MSYSTEM" = "MSYS" ]; then
    SHELL_ENV="msys2-base"
    HAS_PACMAN=1
  else
    SHELL_ENV="msys2-unknown"
    HAS_PACMAN=1
  fi
else
  SHELL_ENV="gitbash"
  HAS_PACMAN=0
fi

# Convert a native Windows path (C:\foo) to POSIX (/c/foo) when needed by bash
win2posix() { cygpath -u "$1" 2>/dev/null || echo "$1"; }
posix2win() { cygpath -w "$1" 2>/dev/null || echo "$1"; }

# ---------- paths ----------
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANDROID_DIR="$PROJECT_DIR/android"
WWW_DIR="$PROJECT_DIR/www"
SRC_BOOK_DIR="${SRC_BOOK_DIR:-$HOME/koutoub/18-aqidat-al-muslim}"
KEYSTORE_DIR="${KEYSTORE_DIR:-$HOME/.keys}"
KEYSTORE_FILE="${KEYSTORE_FILE:-$KEYSTORE_DIR/wdiy-upload.keystore}"
APP_ID="${APP_ID:-org.workshopdiy.aqidatalmuslim}"
AVD_NAME="${AVD_NAME:-aqidat_al_muslim_test}"

# ---------- discover toolchain ----------
# JAVA_HOME — look in typical Windows install locations
if [ -z "${JAVA_HOME:-}" ]; then
  for p in \
    "$HOME/jdk21" \
    "$HOME/jdk17" \
    "/c/Program Files/Android/Android Studio/jbr" \
    "/c/Users/$USER/AppData/Local/Programs/Android Studio/jbr" \
    "/c/Program Files/Eclipse Adoptium/jdk-21"* \
    "/c/Program Files/Java/jdk-21"* \
    "/c/Program Files/Eclipse Adoptium/jdk-17"* \
    "/c/Program Files/Java/jdk-17"*; do
    if [ -d "$p" ]; then export JAVA_HOME="$p"; break; fi
  done
fi

# ANDROID_HOME — default install location on Windows
if [ -z "${ANDROID_HOME:-}" ]; then
  for p in \
    "/c/Users/$USER/AppData/Local/Android/Sdk" \
    "/c/Android/Sdk" \
    "$HOME/AppData/Local/Android/Sdk"; do
    if [ -d "$p" ]; then export ANDROID_HOME="$p"; break; fi
  done
fi

if [ -n "${JAVA_HOME:-}" ]; then export PATH="$JAVA_HOME/bin:$PATH"; fi
if [ -n "${ANDROID_HOME:-}" ]; then
  export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
fi

# ---------- colors ----------
if [ -t 1 ]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; RESET=$'\033[0m'
  RED=$'\033[31m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'
  BLUE=$'\033[34m'; MAGENTA=$'\033[35m'; CYAN=$'\033[36m'
else
  BOLD=""; DIM=""; RESET=""; RED=""; GREEN=""; YELLOW=""; BLUE=""; MAGENTA=""; CYAN=""
fi

ok()    { printf "  ${GREEN}+${RESET} %s\n"    "$*"; }
warn()  { printf "  ${YELLOW}!${RESET} %s\n"   "$*"; }
err()   { printf "  ${RED}x${RESET} %s\n"      "$*"; }
info()  { printf "  ${BLUE}i${RESET} %s\n"     "$*"; }
head1() { printf "\n${BOLD}${MAGENTA}== %s ==${RESET}\n\n" "$*"; }

confirm() { read -r -p "  ${YELLOW}?${RESET} $* [y/N] " reply; [[ "$reply" =~ ^[Yy]$ ]]; }
pause()   { printf "\n  ${DIM}press Enter to return to the menu${RESET}"; read -r; }
have()    { command -v "$1" >/dev/null 2>&1; }

# ============================================================================
cmd_check() {
  head1 "Environment check (Windows $SHELL_ENV)"

  if have node;  then ok "node    $(node --version)";  else err "node not found — install Node.js from https://nodejs.org"; fi
  if have npm;   then ok "npm     $(npm --version)";   else err "npm not found"; fi
  if have git;   then ok "git     $(git --version | awk '{print $3}')"; else err "git not found"; fi
  if have curl;  then ok "curl    present";            else warn "curl not found"; fi
  if have unzip; then ok "unzip   present";            else warn "unzip not found"; fi
  if have winget;then ok "winget  present (can use for installs)"; else info "winget not in PATH (normal for git-bash)"; fi

  # Java
  if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/java.exe" ]; then
    local jv
    jv=$("$JAVA_HOME/bin/java.exe" -version 2>&1 | head -1 | cut -d\" -f2)
    ok "java    $jv"
    info "        JAVA_HOME=$JAVA_HOME"
  elif [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/java" ]; then
    ok "java    $("$JAVA_HOME/bin/java" -version 2>&1 | head -1 | cut -d\" -f2)"
  else
    err "No JDK found — install Android Studio (option 2)"
  fi

  if have sdkmanager; then ok "sdkmanager  present"; else err "sdkmanager not found — option 2"; fi
  if have adb;        then ok "adb     $(adb --version | head -1 | awk '{print $5}')"; else err "adb not found"; fi
  if have emulator;   then ok "emulator  present"; else err "emulator not found"; fi

  # ANDROID_HOME existence
  printf "\n  ${DIM}Android SDK at:${RESET} %s\n" "${ANDROID_HOME:-<not set>}"
  if [ -d "${ANDROID_HOME:-}/platforms" ]; then
    ls "${ANDROID_HOME}/platforms" 2>/dev/null | sed 's/^/    /'
  else
    err "No SDK platforms — run option 3"
  fi

  # Hyper-V / WHPX detection (emulator acceleration on Windows)
  if have powershell.exe; then
    local whpx
    whpx=$(powershell.exe -NoProfile -Command "(Get-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -ErrorAction SilentlyContinue).State" 2>/dev/null | tr -d '\r\n ')
    case "$whpx" in
      Enabled) ok "Windows Hypervisor Platform enabled (fast emulator)" ;;
      Disabled) warn "WHPX not enabled — emulator will be slow. Turn on via 'Windows features'." ;;
      *) info "Could not probe WHPX state" ;;
    esac
  fi

  printf "\n  ${DIM}Project status:${RESET}\n"
  [ -f "$PROJECT_DIR/capacitor.config.json" ] && ok "capacitor.config.json present" || warn "no capacitor.config.json"
  [ -d "$PROJECT_DIR/node_modules/@capacitor/cli" ] && ok "capacitor CLI installed" || warn "run: npm install"
  [ -d "$ANDROID_DIR" ] && ok "android/ present" || warn "run: npx cap add android"
  [ -f "$KEYSTORE_FILE" ] && ok "upload keystore at $KEYSTORE_FILE" || warn "keystore not created — option 7"
  [ -f "$ANDROID_DIR/keystore.properties" ] && ok "keystore.properties wired" || warn "keystore.properties missing"

  pause
}

# ============================================================================
cmd_install_prereqs() {
  head1 "Install prerequisites (Windows)"

  echo "  You are in: $SHELL_ENV"
  echo ""

  if [ "$HAS_PACMAN" = "1" ]; then
    info "MSYS2 detected — can install via pacman."
    info "Recommended for UCRT64:"
    echo ""
    echo "    pacman -Syu"
    echo "    pacman -S mingw-w64-ucrt-x86_64-nodejs"
    echo "    pacman -S mingw-w64-ucrt-x86_64-jdk-openjdk"
    echo "    pacman -S git unzip curl rsync"
    echo ""
    info "Android Studio itself is NOT in pacman — download from:"
    info "  https://developer.android.com/studio"
    echo ""
    if confirm "Run the pacman install now?"; then
      pacman -Syu --noconfirm
      pacman -S --noconfirm mingw-w64-ucrt-x86_64-nodejs mingw-w64-ucrt-x86_64-jdk-openjdk git unzip curl rsync
    fi
  else
    info "git-bash detected (Git for Windows)."
    info "git-bash has no package manager. Install tools individually:"
    echo ""
    info "  1) Node.js:          https://nodejs.org (LTS, .msi installer)"
    info "  2) Android Studio:   https://developer.android.com/studio"
    info "  3) (Git is already installed — you're in git-bash)"
    echo ""
    info "If you have winget (Windows 10+):"
    echo ""
    echo "    cmd //c \"winget install OpenJS.NodeJS\""
    echo "    cmd //c \"winget install Google.AndroidStudio\""
    echo ""
    if have winget && confirm "Run winget installs now (opens cmd)?"; then
      cmd //c "winget install --id OpenJS.NodeJS --silent --accept-source-agreements --accept-package-agreements"
      cmd //c "winget install --id Google.AndroidStudio --silent --accept-source-agreements --accept-package-agreements"
    fi
  fi

  echo ""
  info "After Android Studio installs, open it once so it downloads the SDK."
  info "Then close it and re-run this script → option 1 to verify."
  pause
}

# ============================================================================
cmd_install_sdk() {
  head1 "Install Android SDK components"

  if ! have sdkmanager; then
    err "sdkmanager not found."
    info "Open Android Studio once, let it install the SDK, then ensure cmdline-tools/latest/bin is in PATH."
    info "Usually at: $ANDROID_HOME/cmdline-tools/latest/bin"
    pause; return
  fi

  info "Will install: platform-tools, platforms;android-34, build-tools;34.0.0, emulator, system-images;android-34;google_apis;x86_64"
  confirm "Proceed?" || { pause; return; }

  # On Windows the 'yes' command isn't always there, use printf loop
  printf 'y\n%.0s' {1..20} | sdkmanager --licenses >/dev/null 2>&1 || true
  sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
  sdkmanager "emulator" "system-images;android-34;google_apis;x86_64"

  pause
}

# ============================================================================
cmd_sync() {
  head1 "Sync web assets -> Android"
  if [ ! -d "$SRC_BOOK_DIR" ]; then
    err "Source not found: $SRC_BOOK_DIR"
    info "Set SRC_BOOK_DIR env var to point to your book folder."
    pause; return
  fi
  info "Source:      $SRC_BOOK_DIR"
  info "Destination: $WWW_DIR/"
  confirm "Copy + sync?" || { pause; return; }
  mkdir -p "$WWW_DIR"
  if have rsync; then
    rsync -a --delete "$SRC_BOOK_DIR/" "$WWW_DIR/"
  else
    # Fallback when rsync isn't available (e.g. plain git-bash)
    rm -rf "$WWW_DIR"/*
    cp -R "$SRC_BOOK_DIR"/* "$WWW_DIR/"
  fi
  ok "Web files copied."
  cd "$PROJECT_DIR"
  [ -d "node_modules/@capacitor/cli" ] || { info "npm install..."; npm install; }
  if [ ! -d "$ANDROID_DIR" ]; then
    info "android/ missing — running 'npx cap add android' first..."
    npx cap add android
    if [ -x "$PROJECT_DIR/_patch_signing.py" ]; then
      python3 "$PROJECT_DIR/_patch_signing.py" "$ANDROID_DIR/app/build.gradle"
    fi
  fi
  npx cap sync android
  ok "Synced."
  pause
}

# ============================================================================
cmd_build_debug() {
  head1 "Build debug APK"
  [ -d "$ANDROID_DIR" ] || { err "android/ missing."; pause; return; }
  cd "$ANDROID_DIR"
  local sdkwin
  sdkwin=$(posix2win "$ANDROID_HOME" | sed 's/\\/\\\\/g')
  echo "sdk.dir=$sdkwin" > local.properties
  # On Windows use gradlew.bat instead of the shell gradlew
  if [ -f "gradlew.bat" ]; then
    cmd //c "gradlew.bat assembleDebug"
  else
    ./gradlew assembleDebug
  fi
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
    confirm "Build unsigned?" || { pause; return; }
  fi
  cd "$ANDROID_DIR"
  local sdkwin
  sdkwin=$(posix2win "$ANDROID_HOME" | sed 's/\\/\\\\/g')
  echo "sdk.dir=$sdkwin" > local.properties
  if [ -f "gradlew.bat" ]; then
    cmd //c "gradlew.bat bundleRelease"
  else
    ./gradlew bundleRelease
  fi
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
    mkdir -p "$KEYSTORE_DIR"
    keytool -genkey -v \
      -keystore "$KEYSTORE_FILE" \
      -alias wdiy \
      -keyalg RSA -keysize 2048 -validity 10000 \
      -storetype PKCS12
    [ -f "$KEYSTORE_FILE" ] && ok "Keystore created. BACK IT UP NOW." || { err "Failed."; pause; return; }
  fi

  if [ ! -f "$ANDROID_DIR/keystore.properties" ]; then
    confirm "Create keystore.properties?" || { pause; return; }
    local storepath_win
    storepath_win=$(posix2win "$KEYSTORE_FILE" | sed 's/\\/\\\\/g')
    cat > "$ANDROID_DIR/keystore.properties" <<EOF
storeFile=$storepath_win
storePassword=REPLACE_WITH_YOUR_KEYSTORE_PASSWORD
keyAlias=wdiy
keyPassword=REPLACE_WITH_YOUR_KEY_PASSWORD
EOF
    info "Created. Edit it now."
    "${EDITOR:-notepad.exe}" "$(posix2win "$ANDROID_DIR/keystore.properties")"
  else
    ok "keystore.properties exists."
    if grep -q "REPLACE_WITH_YOUR" "$ANDROID_DIR/keystore.properties"; then
      warn "Contains placeholders — edit!"
      confirm "Open notepad?" && notepad.exe "$(posix2win "$ANDROID_DIR/keystore.properties")"
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
  info "Starting '$AVD_NAME' in background..."
  # On Windows we can't easily background a detached process from bash;
  # use start /b via cmd for real detachment
  cmd //c "start /b emulator -avd $AVD_NAME -no-snapshot -no-audio -no-boot-anim" 2>/dev/null || \
    emulator -avd "$AVD_NAME" -no-snapshot -no-audio -no-boot-anim >/tmp/emu.log 2>&1 &
  adb wait-for-device
  local boot="" tries=0
  while [ "$boot" != "1" ] && [ $tries -lt 30 ]; do
    boot=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    [ "$boot" = "1" ] && break
    sleep 6; tries=$((tries+1)); printf "."
  done
  echo ""
  [ "$boot" = "1" ] && ok "Booted." || err "Timed out — check Android Studio's emulator view."
  pause
}

# ============================================================================
cmd_install() {
  head1 "Install APK on device"
  adb devices | tail -n +2 | grep -qv '^$' || { err "No device connected."; pause; return; }
  local apk="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
  [ -f "$apk" ] || { err "APK missing — option 5."; pause; return; }
  adb devices
  adb install -r "$apk"
  adb shell am start -n "$APP_ID/.MainActivity"
  ok "Launched."
  pause
}

# ============================================================================
cmd_test() {
  head1 "Screenshot"
  adb devices | tail -n +2 | grep -qv '^$' || { err "No device."; pause; return; }
  local out="/tmp/aqidat-al-muslim-$(date +%Y%m%d-%H%M%S).png"
  adb exec-out screencap -p > "$out"
  if [ -s "$out" ]; then
    ok "Saved: $out"
    confirm "Open it?" && (start "" "$(posix2win "$out")" 2>/dev/null || cmd //c "start \"\" \"$(posix2win "$out")\"")
  else err "Screenshot failed."; fi
  pause
}

# ============================================================================
cmd_workshop() {
  head1 "Open WORKSHOP.html"
  local html="$PROJECT_DIR/WORKSHOP.html"
  [ -f "$html" ] || { err "Missing."; pause; return; }
  start "" "$(posix2win "$html")" 2>/dev/null || cmd //c "start \"\" \"$(posix2win "$html")\""
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
${BOLD}${MAGENTA}+==================================================================+
|   Aqidat al-Muslim Android . management console (Windows $SHELL_ENV)${RESET}${BOLD}${MAGENTA}
|   ${DIM}companion to WORKSHOP.html${RESET}${BOLD}${MAGENTA}
+==================================================================+${RESET}

  ${BOLD}Project:${RESET} $PROJECT_DIR
  ${BOLD}App id:${RESET}  $APP_ID
  ${BOLD}Source:${RESET}  $SRC_BOOK_DIR

  ${CYAN}-- inspect --${RESET}
    1)  Check environment
   12)  Open WORKSHOP.html
   13)  Git status

  ${CYAN}-- install --${RESET}
    2)  Install prerequisites     ${DIM}(pacman on MSYS2 / winget otherwise)${RESET}
    3)  Install SDK components

  ${CYAN}-- build --${RESET}
    4)  Sync web app -> Android
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
