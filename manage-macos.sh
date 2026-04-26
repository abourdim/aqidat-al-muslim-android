#!/usr/bin/env bash
# ============================================================================
#  Aqidat al-Muslim Android · management console
#  Companion script for WORKSHOP.html — check, install, build, test, publish
# ============================================================================
set -u

# ---------- paths ----------
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANDROID_DIR="$PROJECT_DIR/android"
WWW_DIR="$PROJECT_DIR/www"
SRC_BOOK_DIR="${SRC_BOOK_DIR:-$HOME/Desktop/02_choughl/koutoub/18-aqidat-al-muslim}"
KEYSTORE_DIR="${KEYSTORE_DIR:-$HOME/keys}"
KEYSTORE_FILE="${KEYSTORE_FILE:-$KEYSTORE_DIR/wdiy-upload.keystore}"
APP_ID="${APP_ID:-org.workshopdiy.aqidatalmuslim}"
AVD_NAME="${AVD_NAME:-aqidat_al_muslim_test}"

# ---------- discover toolchain ----------
# Capacitor 8 needs JDK 21+. Try user-local first, then Android Studio's bundled JBR.
if [ -z "${JAVA_HOME:-}" ]; then
  for p in "$HOME/jdk21" "$HOME/jdk17" \
           "/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
           /Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home \
           /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home; do
    [ -d "$p" ] && export JAVA_HOME="$p" && break
  done
fi
export JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"
export ANDROID_HOME="${ANDROID_HOME:-/usr/local/share/android-commandlinetools}"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

# ---------- colors ----------
if [ -t 1 ]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; RESET=$'\033[0m'
  RED=$'\033[31m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'
  BLUE=$'\033[34m'; MAGENTA=$'\033[35m'; CYAN=$'\033[36m'
else
  BOLD=""; DIM=""; RESET=""; RED=""; GREEN=""; YELLOW=""; BLUE=""; MAGENTA=""; CYAN=""
fi

# ---------- helpers ----------
ok()    { printf "  ${GREEN}✓${RESET} %s\n"    "$*"; }
warn()  { printf "  ${YELLOW}!${RESET} %s\n"   "$*"; }
err()   { printf "  ${RED}✗${RESET} %s\n"      "$*"; }
info()  { printf "  ${BLUE}ℹ${RESET} %s\n"     "$*"; }
head1() { printf "\n${BOLD}${MAGENTA}══ %s ══${RESET}\n\n" "$*"; }

confirm() {
  # usage: confirm "Question?" && action
  read -r -p "  ${YELLOW}?${RESET} $* [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]]
}

pause() {
  printf "\n  ${DIM}press Enter to return to the menu${RESET}"
  read -r
}

have() { command -v "$1" >/dev/null 2>&1; }

# ============================================================================
# 1. CHECK ENVIRONMENT
# ============================================================================
cmd_check() {
  head1 "Environment check"

  # core tools
  if have node;  then ok "node    $(node --version)";      else err "node not found — install with: brew install node"; fi
  if have npm;   then ok "npm     $(npm --version)";       else err "npm not found"; fi
  if have brew;  then ok "brew    $(brew --version | head -1 | awk '{print $2}')"; else err "brew not found — see brew.sh"; fi
  if have git;   then ok "git     $(git --version | awk '{print $3}')"; else err "git not found"; fi

  # java (embedded in Android Studio)
  if [ -x "$JAVA_HOME/bin/java" ]; then
    ok "java    $("$JAVA_HOME/bin/java" -version 2>&1 | head -1 | cut -d\" -f2) (Android Studio embedded)"
  else
    err "Android Studio JDK not found at $JAVA_HOME — install: brew install --cask android-studio"
  fi

  # android sdk
  if have sdkmanager; then ok "sdkmanager  $(sdkmanager --version 2>/dev/null | tail -1)"; else err "sdkmanager not found — install: brew install --cask android-commandlinetools"; fi
  if have adb;        then ok "adb     $(adb --version | head -1 | awk '{print $5}')"; else err "adb not found"; fi
  if have emulator;   then ok "emulator  $(emulator -version 2>&1 | head -1 | awk '{print $3}')"; else err "emulator not found"; fi
  if have avdmanager; then ok "avdmanager present"; else warn "avdmanager not found"; fi

  # SDK components
  printf "\n  ${DIM}Installed SDK components:${RESET}\n"
  if [ -d "$ANDROID_HOME/platforms" ]; then
    ls "$ANDROID_HOME/platforms" 2>/dev/null | sed 's/^/    /'
  else
    err "No SDK platforms installed — option 3"
  fi

  # capacitor project status
  printf "\n  ${DIM}Project status:${RESET}\n"
  [ -f "$PROJECT_DIR/capacitor.config.json" ] && ok "capacitor.config.json present" || warn "no capacitor.config.json"
  [ -d "$PROJECT_DIR/node_modules/@capacitor/cli" ] && ok "capacitor CLI installed" || warn "run: npm install (option 4)"
  [ -d "$ANDROID_DIR" ] && ok "android/ project generated" || warn "run: npx cap add android (option 4)"
  [ -f "$KEYSTORE_FILE" ] && ok "upload keystore present at $KEYSTORE_FILE" || warn "keystore not created yet — option 7"
  [ -f "$ANDROID_DIR/keystore.properties" ] && ok "keystore.properties wired" || warn "keystore.properties missing — option 7"

  # emulator
  if have emulator; then
    local avds
    avds=$(emulator -list-avds 2>/dev/null | tr '\n' ' ')
    if [ -n "$avds" ]; then
      ok "emulators available: $avds"
    else
      warn "no AVDs defined — option 8"
    fi
  fi

  pause
}

# ============================================================================
# 2. INSTALL PREREQUISITES
# ============================================================================
cmd_install_prereqs() {
  head1 "Install prerequisites"

  if ! have brew; then
    err "Homebrew is required. Install from https://brew.sh first."
    pause; return
  fi

  local plan=()
  [ -x "$JAVA_HOME/bin/java" ] || plan+=("android-studio")
  have sdkmanager || plan+=("android-commandlinetools")

  if [ ${#plan[@]} -eq 0 ]; then
    ok "All prerequisites already installed."
    pause; return
  fi

  info "Will install (via brew --cask): ${plan[*]}"
  info "Total download: ~5 GB. First time only."
  confirm "Proceed with installation?" || { info "Cancelled."; pause; return; }

  for pkg in "${plan[@]}"; do
    printf "\n  ${CYAN}→ brew install --cask %s${RESET}\n" "$pkg"
    brew install --cask "$pkg"
  done

  pause
}

# ============================================================================
# 3. INSTALL ANDROID SDK COMPONENTS
# ============================================================================
cmd_install_sdk() {
  head1 "Install Android SDK components"

  if ! have sdkmanager; then
    err "sdkmanager not found. Run option 2 first."
    pause; return
  fi

  info "Will accept licenses, then install: platform-tools, platforms;android-34,"
  info "build-tools;34.0.0, emulator, system-images;android-34;google_apis;x86_64"
  confirm "Proceed?" || { info "Cancelled."; pause; return; }

  yes | sdkmanager --licenses >/dev/null 2>&1 || true
  sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
  sdkmanager "emulator" "system-images;android-34;google_apis;x86_64"

  pause
}

# ============================================================================
# 4. SYNC / SCAFFOLD CAPACITOR PROJECT
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
  confirm "Copy + sync?" || { info "Cancelled."; pause; return; }

  mkdir -p "$WWW_DIR"
  rsync -a --delete "$SRC_BOOK_DIR/" "$WWW_DIR/"
  ok "Web files copied to www/"

  cd "$PROJECT_DIR"
  if [ ! -d "node_modules/@capacitor/cli" ]; then
    info "Installing Capacitor npm deps..."
    npm install
  fi

  if [ ! -d "$ANDROID_DIR" ]; then
    info "android/ missing — running 'npx cap add android' first..."
    npx cap add android
    if [ -x "$PROJECT_DIR/_patch_signing.py" ]; then
      python3 "$PROJECT_DIR/_patch_signing.py" "$ANDROID_DIR/app/build.gradle"
    fi
  fi

  info "Running: npx cap sync android"
  npx cap sync android

  ok "Android project assets refreshed."
  pause
}

# ============================================================================
# 5. BUILD DEBUG APK
# ============================================================================
cmd_build_debug() {
  head1 "Build debug APK"

  if [ ! -d "$ANDROID_DIR" ]; then
    err "android/ not found. Run option 4 first."
    pause; return
  fi

  cd "$ANDROID_DIR"
  echo "sdk.dir=$ANDROID_HOME" > local.properties
  ./gradlew assembleDebug

  local apk="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
  if [ -f "$apk" ]; then
    ok "APK: $apk ($(du -h "$apk" | awk '{print $1}'))"
  else
    err "APK not produced."
  fi
  pause
}

# ============================================================================
# 6. BUILD RELEASE AAB
# ============================================================================
cmd_build_release() {
  head1 "Build release AAB"

  if [ ! -d "$ANDROID_DIR" ]; then
    err "android/ not found."
    pause; return
  fi

  if [ ! -f "$ANDROID_DIR/keystore.properties" ]; then
    warn "keystore.properties not found — AAB will be unsigned (not uploadable)."
    confirm "Build unsigned anyway?" || { pause; return; }
  fi

  if [ -x "$PROJECT_DIR/_patch_signing.py" ]; then
    python3 "$PROJECT_DIR/_patch_signing.py" "$ANDROID_DIR/app/build.gradle"
  fi
  cd "$ANDROID_DIR"
  echo "sdk.dir=$ANDROID_HOME" > local.properties
  ./gradlew bundleRelease

  local aab="$ANDROID_DIR/app/build/outputs/bundle/release/app-release.aab"
  if [ -f "$aab" ]; then
    ok "AAB: $aab ($(du -h "$aab" | awk '{print $1}'))"
  else
    err "AAB not produced."
  fi
  pause
}

# ============================================================================
# 7. KEYSTORE MANAGEMENT
# ============================================================================
cmd_keystore() {
  head1 "Keystore management"

  if [ -f "$KEYSTORE_FILE" ]; then
    ok "Keystore already exists at $KEYSTORE_FILE"
    keytool -list -v -keystore "$KEYSTORE_FILE" -storetype PKCS12 2>/dev/null | grep -E "Alias|Creation|Valid" | sed 's/^/    /' || true
    info "To regenerate, delete the file manually first."
  else
    warn "No keystore at $KEYSTORE_FILE"
    info "Creating one is interactive — you'll be prompted for password + identity."
    confirm "Create now?" || { info "Cancelled."; pause; return; }
    mkdir -p "$KEYSTORE_DIR"
    keytool -genkey -v \
      -keystore "$KEYSTORE_FILE" \
      -alias wdiy \
      -keyalg RSA -keysize 2048 -validity 10000 \
      -storetype PKCS12
    if [ -f "$KEYSTORE_FILE" ]; then
      ok "Keystore created. BACK IT UP NOW."
    else
      err "Keystore not created."
      pause; return
    fi
  fi

  # wire into gradle
  if [ ! -f "$ANDROID_DIR/keystore.properties" ]; then
    warn "keystore.properties not configured."
    confirm "Create keystore.properties (you'll fill the password)?" || { pause; return; }
    cat > "$ANDROID_DIR/keystore.properties" <<EOF
storeFile=$KEYSTORE_FILE
storePassword=REPLACE_WITH_YOUR_KEYSTORE_PASSWORD
keyAlias=wdiy
keyPassword=REPLACE_WITH_YOUR_KEY_PASSWORD
EOF
    info "Created $ANDROID_DIR/keystore.properties"
    info "Edit it now to fill in your password before building release."
    ${EDITOR:-nano} "$ANDROID_DIR/keystore.properties"
  else
    ok "keystore.properties already wired."
    if grep -q "REPLACE_WITH_YOUR" "$ANDROID_DIR/keystore.properties"; then
      warn "keystore.properties still contains placeholders — edit it!"
      confirm "Open in editor?" && ${EDITOR:-nano} "$ANDROID_DIR/keystore.properties"
    fi
  fi
  pause
}

# ============================================================================
# 8. CREATE EMULATOR
# ============================================================================
cmd_avd_create() {
  head1 "Create Android emulator (AVD)"

  if ! have avdmanager; then
    err "avdmanager not found. Run option 2 + 3 first."
    pause; return
  fi

  if emulator -list-avds 2>/dev/null | grep -qx "$AVD_NAME"; then
    ok "AVD '$AVD_NAME' already exists."
    pause; return
  fi

  info "Creating AVD '$AVD_NAME' (pixel_7, android-34, x86_64)"
  confirm "Proceed?" || { info "Cancelled."; pause; return; }

  echo no | avdmanager create avd -n "$AVD_NAME" \
    -k "system-images;android-34;google_apis;x86_64" \
    -d "pixel_7"

  if emulator -list-avds 2>/dev/null | grep -qx "$AVD_NAME"; then
    ok "AVD created: $AVD_NAME"
  else
    err "AVD creation failed."
  fi
  pause
}

# ============================================================================
# 9. LAUNCH EMULATOR
# ============================================================================
cmd_emu_start() {
  head1 "Launch emulator"

  if adb devices | grep -q "emulator-"; then
    ok "An emulator is already running."
    pause; return
  fi

  if ! emulator -list-avds 2>/dev/null | grep -qx "$AVD_NAME"; then
    err "AVD '$AVD_NAME' not found. Run option 8 first."
    pause; return
  fi

  info "Starting '$AVD_NAME' in background (no audio, no snapshot)..."
  (emulator -avd "$AVD_NAME" -no-snapshot -no-audio -no-boot-anim >/tmp/emu.log 2>&1 &)

  info "Waiting for device to boot (up to 3 minutes on Intel Mac)..."
  adb wait-for-device
  local boot=""
  local tries=0
  while [ "$boot" != "1" ] && [ $tries -lt 30 ]; do
    boot=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    [ "$boot" = "1" ] && break
    sleep 6; tries=$((tries+1))
    printf "."
  done
  echo ""
  [ "$boot" = "1" ] && ok "Emulator booted." || err "Boot timed out; check /tmp/emu.log"
  pause
}

# ============================================================================
# 10. INSTALL APK ON RUNNING DEVICE
# ============================================================================
cmd_install() {
  head1 "Install APK on device/emulator"

  if ! adb devices | tail -n +2 | grep -qv '^$'; then
    err "No device connected. Run option 9 for emulator, or plug in a phone with USB debugging enabled."
    pause; return
  fi

  local apk="$ANDROID_DIR/app/build/outputs/apk/debug/app-debug.apk"
  if [ ! -f "$apk" ]; then
    err "Debug APK not found — run option 5 first."
    pause; return
  fi

  adb devices
  info "Installing $apk"
  adb install -r "$apk"
  info "Launching $APP_ID"
  adb shell am start -n "$APP_ID/.MainActivity"
  ok "App launched."
  pause
}

# ============================================================================
# 11. QUICK TEST (screenshot current screen)
# ============================================================================
cmd_test() {
  head1 "Smoke test — screenshot"

  if ! adb devices | tail -n +2 | grep -qv '^$'; then
    err "No device connected."
    pause; return
  fi

  local out="/tmp/aqidat-al-muslim-$(date +%Y%m%d-%H%M%S).png"
  adb exec-out screencap -p > "$out"
  if [ -s "$out" ]; then
    ok "Screenshot saved: $out ($(du -h "$out" | awk '{print $1}'))"
    confirm "Open it?" && open "$out"
  else
    err "Screenshot failed."
  fi
  pause
}

# ============================================================================
# 12. OPEN WORKSHOP.html REFERENCE
# ============================================================================
cmd_workshop() {
  head1 "Open WORKSHOP.html"
  local html="$PROJECT_DIR/WORKSHOP.html"
  if [ ! -f "$html" ]; then
    err "WORKSHOP.html not found."
    pause; return
  fi
  info "Opening in default browser..."
  open "$html"
  pause
}

# ============================================================================
# 13. GIT STATUS
# ============================================================================
cmd_git() {
  head1 "Git status"
  if [ ! -d "$PROJECT_DIR/.git" ]; then
    warn "Not a git repo."
    confirm "Initialize one?" && ( cd "$PROJECT_DIR" && git init -b main )
    pause; return
  fi
  cd "$PROJECT_DIR"
  git log --oneline -5 2>/dev/null | sed 's/^/    /' || true
  echo ""
  git status --short
  pause
}

# ============================================================================
# 14. CLEAN BUILD ARTIFACTS
# ============================================================================
cmd_clean() {
  head1 "Clean build artifacts"
  info "Will remove: android/app/build/, android/build/, android/.gradle/"
  confirm "Proceed?" || { info "Cancelled."; pause; return; }
  rm -rf "$ANDROID_DIR/app/build" "$ANDROID_DIR/build" "$ANDROID_DIR/.gradle"
  ok "Cleaned."
  pause
}

# ============================================================================
# MENU
# ============================================================================
show_menu() {
  clear
  cat <<EOF
${BOLD}${MAGENTA}╔════════════════════════════════════════════════════════════════╗
║   Aqidat al-Muslim Android · management console                      ║
║   ${DIM}companion to WORKSHOP.html${RESET}${BOLD}${MAGENTA}                                 ║
╚════════════════════════════════════════════════════════════════╝${RESET}

  ${BOLD}Project:${RESET} $PROJECT_DIR
  ${BOLD}App id:${RESET}  $APP_ID
  ${BOLD}Source:${RESET}  $SRC_BOOK_DIR

  ${CYAN}-- inspect --${RESET}
    1)  Check environment         ${DIM}(tools, SDK, project, keystore)${RESET}
   12)  Open WORKSHOP.html        ${DIM}(the visual guide)${RESET}
   13)  Git status

  ${CYAN}-- install --${RESET}
    2)  Install prerequisites     ${DIM}(Android Studio + cmdline tools)${RESET}
    3)  Install SDK components    ${DIM}(platform-34, emulator, images)${RESET}

  ${CYAN}-- build --${RESET}
    4)  Sync web app → Android    ${DIM}(copy from source book, cap sync)${RESET}
    5)  Build debug APK           ${DIM}(for testing)${RESET}
    6)  Build release AAB         ${DIM}(for Play Store upload)${RESET}
   14)  Clean build artifacts

  ${CYAN}-- sign & release --${RESET}
    7)  Keystore management       ${DIM}(create or inspect upload keystore)${RESET}

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
      1)  cmd_check ;;
      2)  cmd_install_prereqs ;;
      3)  cmd_install_sdk ;;
      4)  cmd_sync ;;
      5)  cmd_build_debug ;;
      6)  cmd_build_release ;;
      7)  cmd_keystore ;;
      8)  cmd_avd_create ;;
      9)  cmd_emu_start ;;
     10)  cmd_install ;;
     11)  cmd_test ;;
     12)  cmd_workshop ;;
     13)  cmd_git ;;
     14)  cmd_clean ;;
      q|Q|exit|quit) echo ""; exit 0 ;;
      *) printf "\n  ${RED}Unknown option: %s${RESET}\n" "$choice"; sleep 1 ;;
    esac
  done
}

main "$@"
