#!/usr/bin/env bash
# ============================================================================
#  Aqidat al-Muslim Android · management console · OS DISPATCHER
#  Detects the host OS and execs the right platform script.
#
#  Usage:  ./manage.sh
#  Override auto-detection: FORCE_OS=linux ./manage.sh
# ============================================================================
set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ---------- colors ----------
if [ -t 1 ]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; RESET=$'\033[0m'
  RED=$'\033[31m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'
  CYAN=$'\033[36m'; MAGENTA=$'\033[35m'
else
  BOLD=""; DIM=""; RESET=""; RED=""; GREEN=""; YELLOW=""; CYAN=""; MAGENTA=""
fi

# ---------- detect OS ----------
detect_os() {
  # Allow manual override
  if [ -n "${FORCE_OS:-}" ]; then
    case "$FORCE_OS" in
      mac|macos|darwin) echo "macos"; return ;;
      linux)            echo "linux"; return ;;
      win|windows)      echo "windows"; return ;;
      *) echo "unknown"; return ;;
    esac
  fi

  # Windows subsystems identify themselves via MSYSTEM or uname -s
  if [ -n "${MSYSTEM:-}" ]; then
    echo "windows"; return
  fi

  local uname_s
  uname_s="$(uname -s 2>/dev/null)"
  case "$uname_s" in
    Darwin*)  echo "macos" ;;
    Linux*)   echo "linux" ;;
    MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
    *)        echo "unknown" ;;
  esac
}

OS="$(detect_os)"

# ---------- optional target platform override (Android vs iOS) ----------
# Only macOS can build iOS. Pass TARGET_PLATFORM=ios to force the iOS menu.
PLATFORM="${TARGET_PLATFORM:-}"

# ---------- map OS → script ----------
case "$OS" in
  macos)
    if [ "$PLATFORM" = "ios" ]; then
      TARGET="$SCRIPT_DIR/manage-ios.sh";         OS_LABEL="🍎 macOS → iPhone / iPad"
    else
      TARGET="$SCRIPT_DIR/manage-macos.sh";       OS_LABEL="🍎 macOS → Android"
    fi
    ;;
  linux)   TARGET="$SCRIPT_DIR/manage-linux.sh";   OS_LABEL="🐧 Linux → Android"        ;;
  windows) TARGET="$SCRIPT_DIR/manage-windows.sh"; OS_LABEL="🪟 Windows (bash) → Android" ;;
  *)       TARGET="";                              OS_LABEL="❓ Unknown"      ;;
esac

# ---------- prompt for target platform on macOS if not set ----------
if [ "$OS" = "macos" ] && [ -z "$PLATFORM" ] && [ -t 0 ]; then
  printf "\n${BOLD}${MAGENTA}── Aqidat al-Muslim · dispatcher ──${RESET}\n\n"
  printf "  ${BOLD}Detected:${RESET} 🍎 macOS\n\n"
  printf "  You can build for either platform on this Mac. Choose target:\n"
  printf "    ${CYAN}1)${RESET} 🤖 Android   ${DIM}(Play Store, \$25 one-time)${RESET}\n"
  printf "    ${CYAN}2)${RESET} 📱 iPhone    ${DIM}(App Store, \$99/year, needs Xcode)${RESET}\n"
  printf "\n  ${BOLD}Choose [1]:${RESET} "
  read -r plat_choice
  case "$plat_choice" in
    2|ios|iphone|ipad) PLATFORM="ios"; TARGET="$SCRIPT_DIR/manage-ios.sh"; OS_LABEL="🍎 macOS → iPhone / iPad" ;;
    *) PLATFORM="android" ;;  # keep existing TARGET (manage-macos.sh)
  esac
fi

# ---------- banner ----------
printf "\n${BOLD}${MAGENTA}── Aqidat al-Muslim · dispatcher ──${RESET}\n\n"
printf "  ${BOLD}Target:${RESET} $OS_LABEL  ${DIM}(uname=$(uname -s 2>/dev/null)${MSYSTEM:+, MSYSTEM=$MSYSTEM})${RESET}\n"

if [ "$OS" = "unknown" ]; then
  printf "\n  ${RED}✗${RESET} Could not identify your OS.\n"
  printf "  Override with: ${CYAN}FORCE_OS=macos${RESET} (or ${CYAN}linux${RESET}, ${CYAN}windows${RESET}) ./manage.sh\n\n"
  exit 1
fi

if [ ! -f "$TARGET" ]; then
  printf "\n  ${RED}✗${RESET} Target script not found: $TARGET\n"
  printf "  Available scripts in this folder:\n"
  ls "$SCRIPT_DIR"/manage-*.sh 2>/dev/null | sed 's|.*/|    |'
  exit 1
fi

if [ ! -x "$TARGET" ]; then
  printf "  ${YELLOW}!${RESET} Making it executable: chmod +x $TARGET\n"
  chmod +x "$TARGET"
fi

printf "  ${GREEN}✓${RESET} Handing off to: ${BOLD}$(basename "$TARGET")${RESET}\n\n"
sleep 1

# ---------- exec the platform script (replaces this process) ----------
exec "$TARGET" "$@"
