#!/usr/bin/env bash

has_command()
{
    type "$@" > /dev/null 2>&1
}

check_dependencies()
{
  if ! has_command npm; then
    echo "npm is needed for this script. Please install."
    return 1
  fi

  if ! has_command jq; then
    echo
    echo "jq is needed for this script. Please install."
    echo "  brew install jq"
    return 1
  fi

  return 0
}

check_dependencies || exit 86

CURRENT_NPM_USER="$(npm whoami)"  || { echo "not logged in"; exit 1; }

npm org ls leading-agile --json | jq '. | has("'"${CURRENT_NPM_USER}"'")' || { echo "not in organization"; exit 1; }

exit 0
