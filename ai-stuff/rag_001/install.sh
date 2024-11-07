#!/bin/sh
set -e

if [ -n "$NO_COLOR" ]; then
    BOLD=""
    RESET=""
else
    BOLD="\033[1m"
    RESET="\033[0m"
fi


usage() {
    cat <<EOF
sqlite-hello-install 0.1.3

USAGE:
    $0 [static|loadable] [--target=target] [--prefix=path]

OPTIONS:
    --target
            Specify a different target platform to install. Available targets: android-aarch64, android-armv7a, android-i686, android-x86_64, ios-aarch64, iossimulator-aarch64, iossimulator-x86_64, linux-x86_64, macos-aarch64, macos-x86_64, windows-x86_64

    --prefix
            Specify a different directory to save the binaries. Defaults to the current working directory.
EOF
}




current_target() {
  if [ "$OS" = "Windows_NT" ]; then
    # TODO disambiguate between x86 and arm windows
    target="windows-x86_64"
    return 0
  fi
  case $(uname -sm) in
  "Darwin x86_64") target=macos-x86_64 ;;
  "Darwin arm64") target=macos-aarch64 ;;
  "Linux x86_64") target=linux-x86_64 ;;
  *) target=$(uname -sm);;
  esac
}



process_arguments() {
  while [[ $# -gt 0 ]]; do
      case "$1" in
          --help)
              usage
              exit 0
              ;;
          --target=*)
              target="\${1#*=}"
              ;;
          --prefix=*)
              prefix="\${1#*=}"
              ;;
          static|loadable)
              type="$1"
              ;;
          *)
              echo "Unrecognized option: $1"
              usage
              exit 1
              ;;
      esac
      shift
  done
  if [ -z "$type" ]; then
    type=loadable
  fi
  if [ "$type" != "static" ] && [ "$type" != "loadable" ]; then
      echo "Invalid type '$type'. It must be either 'static' or 'loadable'."
      usage
      exit 1
  fi
  if [ -z "$prefix" ]; then
    prefix="$PWD"
  fi
  if [ -z "$target" ]; then
    current_target
  fi
}




main() {
    local type=""
    local target=""
    local prefix=""
    local url=""
    local checksum=""

    process_arguments "$@"

    echo "${BOLD}Type${RESET}: $type"
    echo "${BOLD}Target${RESET}: $target"
    echo "${BOLD}Prefix${RESET}: $prefix"

    case "$target-$type" in
    "linux-x86_64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-linux-x86_64.tar.gz"
      checksum="5fa404f6d61de7b462d1f1504332a522a64331103603ca079714f078cdb28606"
      ;;
    "iossimulator-aarch64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-iossimulator-aarch64.tar.gz"
      checksum="0eb4b65415800f535ee5ac2133c124df3412c2792c6a0da570d7e1c8c154fb21"
      ;;
    "android-armv7a-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-android-armv7a.tar.gz"
      checksum="852c2d9bcd860af76cc9f21640cb71bc6f10ed62f7290821c2cb7ddac4db535d"
      ;;
    "ios-aarch64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-ios-aarch64.tar.gz"
      checksum="a3fef185ceb2d63ab07e1da527d7c284efce55f150fefc7267d98b80661ffb77"
      ;;
    "android-x86_64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-android-x86_64.tar.gz"
      checksum="05a4b317cdd9b2a03de99b02ec59ed9faf93487c5b25d877873f0d31bc65f8e0"
      ;;
    "macos-x86_64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-macos-x86_64.tar.gz"
      checksum="8ef228a8935883f8b5c52f191a8123909ea48ab58f6eceb5d4c12ada654556cf"
      ;;
    "android-aarch64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-android-aarch64.tar.gz"
      checksum="a0b42e1da4160feb3538566fe059d5795f1297ade9275bd3c114c1583aeba709"
      ;;
    "windows-x86_64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-windows-x86_64.tar.gz"
      checksum="03e7be4ebb6c5da4f050fc2beceec22610b66354903c57a2cd236d28734b73d6"
      ;;
    "iossimulator-x86_64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-iossimulator-x86_64.tar.gz"
      checksum="cf0885cc9917bc95ce38229fdf3151c62ca029daddd40cdcf300ea709479b1c2"
      ;;
    "macos-aarch64-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-macos-aarch64.tar.gz"
      checksum="c57a552c8a8df823a8deb937f81d8a9ec5c81377e66e86cd5db8508b74ef4068"
      ;;
    "android-i686-loadable")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-loadable-android-i686.tar.gz"
      checksum="8cd884983bfa421c11c9fff298069742970c50dd7698466207d6af0bacc77771"
      ;;
    "linux-x86_64-static")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-static-linux-x86_64.tar.gz"
      checksum="3cb4405a4d140edd9b80207f9a95a158b94051725ecf35640698049e85d73861"
      ;;
    "iossimulator-aarch64-static")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-static-iossimulator-aarch64.tar.gz"
      checksum="27612529ebe707798023eaa60bc603372e518758891fb3e9d5112a1d9d946c45"
      ;;
    "ios-aarch64-static")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-static-ios-aarch64.tar.gz"
      checksum="9ca0daa4db19491926cfeafce3ba058b2ba88adad85c3a33df92ca3913f8ec95"
      ;;
    "macos-x86_64-static")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-static-macos-x86_64.tar.gz"
      checksum="1823629e2b3eacec4ec0dd75655c793f0de61ecc0605c479e8946f98b7821141"
      ;;
    "iossimulator-x86_64-static")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-static-iossimulator-x86_64.tar.gz"
      checksum="87e9c6305936558ec60710c9ce61fc172deb0cb43681d9b47e145e67e034e0ba"
      ;;
    "macos-aarch64-static")
      url="https://github.com/asg017/sqlite-vec/releases/download/v0.1.3/sqlite-vec-0.1.3-static-macos-aarch64.tar.gz"
      checksum="050eb180586b7d99a0d8b56374e424b8461a4788cae9e4077706949074d17d12"
      ;;
    *)
      echo "Unsupported platform $target" 1>&2
      exit 1
      ;;
    esac

    extension="\${url##*.}"

    if [ "$extension" = "zip" ]; then
      tmpfile="$prefix/tmp.zip"
    else
      tmpfile="$prefix/tmp.tar.gz"
    fi

    curl --fail --location --progress-bar --output "$tmpfile" "$url"

    if ! echo "$checksum $tmpfile" | sha256sum --check --status; then
      echo "Checksum fail!"  1>&2
      rm $tmpfile
      exit 1
    fi

    if [ "$extension" = "zip" ]; then
      unzip "$tmpfile" -d $prefix
      rm $tmpfile
    else
      tar -xzf "$tmpfile" -C $prefix
      rm $tmpfile
    fi

    echo "✅ $target $type binaries installed at $prefix."
}



main "$@"
