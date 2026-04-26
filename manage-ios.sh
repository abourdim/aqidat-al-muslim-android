#!/usr/bin/env bash
# ============================================================================
#  Aqidat al-Muslim iOS · management console · macOS ONLY
#  iOS builds require Xcode, which is macOS-only. This script is for Mac users
#  who want to build, test on simulator/device, and publish to App Store.
# ============================================================================
set -u

# ---------- guard: macOS only ----------
if [ "$(uname -s)" != "Darwin" ]; then
  echo "This script only runs on macOS. iOS development requires Xcode."
  echo "Linux/Windows users: stick to the Android flow."
  exit 1
fi

# ---------- paths ----------
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_DIR="$PROJECT_DIR/ios"
WWW_DIR="$PROJECT_DIR/www"
XCWORKSPACE="$IOS_DIR/App/App.xcworkspace"
XCPROJECT="$IOS_DIR/App/App.xcodeproj"
SRC_BOOK_DIR="${SRC_BOOK_DIR:-$HOME/Desktop/02_choughl/koutoub/18-aqidat-al-muslim}"
APP_ID="${APP_ID:-org.workshopdiy.aqidatalmuslim}"
SIM_DEVICE="${SIM_DEVICE:-iPhone 15}"
SIM_OS="${SIM_OS:-17.0}"

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
  head1 "Environment check (iOS)"

  if have node;  then ok "node    $(node --version)";  else err "node missing"; fi
  if have npm;   then ok "npm     $(npm --version)";   else err "npm missing"; fi

  # Xcode
  if have xcode-select; then
    local xp
    xp=$(xcode-select -p 2>/dev/null)
    if [ -n "$xp" ]; then
      ok "xcode-select path: $xp"
    else
      err "xcode-select path not set — run: sudo xcode-select --switch /Applications/Xcode.app"
    fi
  else
    err "xcode-select missing — install Xcode from Mac App Store"
  fi

  # xcodebuild
  if have xcodebuild; then
    local xv
    xv=$(xcodebuild -version 2>&1 | head -1)
    ok "xcodebuild: $xv"
  else
    err "xcodebuild not found — open Xcode once + accept license"
  fi

  # Full Xcode vs CLT only
  if [ -d /Applications/Xcode.app ]; then
    ok "Xcode.app installed"
  else
    warn "Xcode.app not in /Applications — iOS builds will fail. Only Xcode Command Line Tools detected."
    info "Install full Xcode from Mac App Store (~10 GB)."
  fi

  # Simulator runtime
  if have xcrun; then
    local runtimes
    runtimes=$(xcrun simctl list runtimes 2>/dev/null | grep -c "iOS" || true)
    if [ "$runtimes" -gt 0 ]; then
      ok "iOS simulator runtimes: $runtimes available"
    else
      warn "No iOS simulator runtimes — install via: Xcode → Settings → Platforms"
    fi
  fi

  # CocoaPods (needed by Capacitor iOS)
  if have pod; then
    ok "CocoaPods: $(pod --version)"
  else
    warn "CocoaPods not installed — run: sudo gem install cocoapods (or: brew install cocoapods)"
  fi

  # ios-deploy (for sideloading to real device from CLI)
  if have ios-deploy; then
    ok "ios-deploy: $(ios-deploy --version 2>&1 | head -1)"
  else
    info "ios-deploy not installed (optional). Install: brew install ios-deploy"
  fi

  # Project state
  printf "\n  ${DIM}Project status:${RESET}\n"
  [ -d "$IOS_DIR" ] && ok "ios/ project present" || err "no ios/ — run: npx cap add ios"
  [ -d "$XCPROJECT" ] && ok "App.xcodeproj present" || warn "Xcode project missing"
  [ -d "$XCWORKSPACE" ] && ok "App.xcworkspace present" || info "workspace only generated after pod install (run option 4)"

  # Apple Developer signing info (from Xcode)
  local team
  team=$(defaults read com.apple.dt.Xcode IDEProvisioningTeams 2>/dev/null | head -3 | tail -1 || true)
  if [ -n "$team" ]; then
    ok "Xcode has team(s) configured"
  else
    warn "No Apple Developer Team set in Xcode. Open Xcode → Settings → Accounts."
  fi

  pause
}

# ============================================================================
cmd_install_xcode() {
  head1 "Install Xcode (Mac App Store required)"
  info "Xcode is distributed only through the Mac App Store."
  info "Open: https://apps.apple.com/us/app/xcode/id497799835"
  echo ""
  info "After download (~10 GB):"
  info "  1. Launch Xcode once."
  info "  2. Accept the license + install additional components."
  info "  3. Run: sudo xcode-select --switch /Applications/Xcode.app"
  info "  4. In Xcode → Settings → Platforms → download iOS 17 simulator runtime."
  echo ""
  info "Free Apple ID works for building + running on simulator."
  info "Real-device deploys + App Store submission need Apple Developer Program (\$99/yr)."
  echo ""
  confirm "Open the Mac App Store page now?" && open "macappstore://apps.apple.com/app/xcode/id497799835"
  pause
}

# ============================================================================
cmd_install_pods() {
  head1 "Install CocoaPods + iOS deps"

  if ! have pod; then
    warn "CocoaPods not found."
    confirm "Install via brew?" || { pause; return; }
    if ! have brew; then err "brew missing."; pause; return; fi
    brew install cocoapods
  fi

  if [ ! -d "$IOS_DIR/App" ]; then
    err "iOS project missing — run: npx cap add ios"
    pause; return
  fi

  cd "$IOS_DIR/App"
  info "Running: pod install"
  pod install
  pause
}

# ============================================================================
cmd_sync() {
  head1 "Sync web assets → iOS project"
  if [ ! -d "$SRC_BOOK_DIR" ]; then
    err "Source book not found at $SRC_BOOK_DIR"
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
  info "Running: npx cap sync ios"
  npx cap sync ios
  ok "iOS project refreshed."
  pause
}

# ============================================================================
cmd_open_xcode() {
  head1 "Open Xcode"
  if [ ! -d "$IOS_DIR" ]; then err "ios/ not scaffolded."; pause; return; fi
  if [ -d "$XCWORKSPACE" ]; then
    info "Opening workspace (pods included): $XCWORKSPACE"
    open "$XCWORKSPACE"
  elif [ -d "$XCPROJECT" ]; then
    warn "Workspace missing — opening bare project. Run pod install (option 4) first!"
    open "$XCPROJECT"
  else
    err "Neither workspace nor project found."
  fi
  pause
}

# ============================================================================
cmd_build_sim() {
  head1 "Build + run on iOS simulator"
  if ! have xcodebuild; then err "xcodebuild missing."; pause; return; fi
  if [ ! -d "$XCWORKSPACE" ]; then err "Workspace missing — run option 4 (pod install)."; pause; return; fi

  info "Device: $SIM_DEVICE · iOS $SIM_OS"
  info "Override with SIM_DEVICE / SIM_OS env vars."
  confirm "Proceed?" || { pause; return; }

  cd "$IOS_DIR/App"
  xcodebuild \
    -workspace App.xcworkspace \
    -scheme App \
    -configuration Debug \
    -destination "platform=iOS Simulator,name=$SIM_DEVICE,OS=$SIM_OS" \
    build | tail -20

  info ""
  info "After build succeeds, install + launch on simulator:"
  info "  xcrun simctl boot \"$SIM_DEVICE\" || true"
  info "  open -a Simulator"
  info "  xcrun simctl install booted <app-path>.app"
  info "  xcrun simctl launch booted $APP_ID"
  info ""
  info "Easier: use Xcode GUI (option 5 opens it)."
  pause
}

# ============================================================================
cmd_archive_release() {
  head1 "Archive for App Store (release IPA)"
  info "This creates an archive (.xcarchive) suitable for App Store Connect upload."
  info "Prerequisites:"
  info "  - Apple Developer account (\$99/yr)"
  info "  - Signing certificate + provisioning profile configured in Xcode"
  info "  - Team set in Signing & Capabilities in Xcode"
  echo ""
  info "Recommended: do this step in Xcode GUI: Product → Archive"
  info "Then Window → Organizer → Distribute App → App Store Connect → Upload"
  echo ""
  confirm "Open Xcode now?" && open "$XCWORKSPACE"
  pause
}

# ============================================================================
cmd_simulator_start() {
  head1 "Launch iOS Simulator"
  if ! have xcrun; then err "xcrun missing."; pause; return; fi

  info "Booting: $SIM_DEVICE"
  xcrun simctl boot "$SIM_DEVICE" 2>/dev/null || true
  open -a Simulator
  ok "Simulator launched."
  pause
}

# ============================================================================
cmd_screenshot() {
  head1 "Screenshot iOS Simulator"
  if ! have xcrun; then err "xcrun missing."; pause; return; fi
  local out="/tmp/ios-aqidat-al-muslim-$(date +%Y%m%d-%H%M%S).png"
  xcrun simctl io booted screenshot "$out" 2>&1 | tail -2
  if [ -s "$out" ]; then
    ok "Saved: $out"
    confirm "Open?" && open "$out"
  else
    err "Screenshot failed. Is the simulator booted?"
  fi
  pause
}

# ============================================================================
cmd_workshop() {
  head1 "Open WORKSHOP.html"
  local html="$PROJECT_DIR/WORKSHOP.html"
  [ -f "$html" ] || { err "Missing."; pause; return; }
  open "$html"
  pause
}

# ============================================================================
cmd_clean() {
  head1 "Clean iOS build artifacts"
  info "Remove: ios/App/build, ios/App/Pods, ios/DerivedData"
  confirm "Proceed?" || { pause; return; }
  rm -rf "$IOS_DIR/App/build" "$IOS_DIR/App/Pods" "$IOS_DIR/DerivedData"
  # Also Xcode's user-specific derived data (safe)
  rm -rf "$HOME/Library/Developer/Xcode/DerivedData/App-"* 2>/dev/null || true
  ok "Cleaned."
  pause
}

# ============================================================================
show_menu() {
  clear
  cat <<EOF
${BOLD}${MAGENTA}╔════════════════════════════════════════════════════════════════╗
║   Aqidat al-Muslim iOS · management console (macOS only)             ║
║   ${DIM}companion to WORKSHOP.html${RESET}${BOLD}${MAGENTA}                                 ║
╚════════════════════════════════════════════════════════════════╝${RESET}

  ${BOLD}Project:${RESET} $PROJECT_DIR
  ${BOLD}App id:${RESET}  $APP_ID
  ${BOLD}Source:${RESET}  $SRC_BOOK_DIR
  ${BOLD}Sim:${RESET}     $SIM_DEVICE · iOS $SIM_OS

  ${CYAN}-- inspect --${RESET}
    1)  Check environment         ${DIM}(Xcode, pods, simulator, team)${RESET}
   11)  Open WORKSHOP.html

  ${CYAN}-- install --${RESET}
    2)  Install Xcode             ${DIM}(opens Mac App Store)${RESET}
    3)  (reserved)
    4)  Install CocoaPods + run pod install

  ${CYAN}-- build --${RESET}
    5)  Sync web app → iOS
    6)  Open Xcode workspace      ${DIM}(GUI builds, signing, archive)${RESET}
    7)  Build debug for simulator ${DIM}(CLI, no GUI)${RESET}
    8)  Archive for App Store     ${DIM}(opens Xcode — GUI needed for signing)${RESET}
   12)  Clean build artifacts

  ${CYAN}-- test on simulator --${RESET}
    9)  Launch iOS Simulator
   10)  Take screenshot

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
      2)  cmd_install_xcode ;;
      4)  cmd_install_pods ;;
      5)  cmd_sync ;;
      6)  cmd_open_xcode ;;
      7)  cmd_build_sim ;;
      8)  cmd_archive_release ;;
      9)  cmd_simulator_start ;;
     10)  cmd_screenshot ;;
     11)  cmd_workshop ;;
     12)  cmd_clean ;;
      q|Q|exit|quit) echo ""; exit 0 ;;
      *) printf "\n  ${RED}Unknown option: %s${RESET}\n" "$choice"; sleep 1 ;;
    esac
  done
}

main "$@"
