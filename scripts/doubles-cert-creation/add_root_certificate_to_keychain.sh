#!/usr/bin/env bash

LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASEPATH="${LOCATION}/../../src/doubles"

ROOTCA_PEM_FILE="${BASEPATH}/rootCA.pem"
SYSTEM_KEYCHAIN_FILE="/Library/Keychains/System.keychain"

sudo security add-trusted-cert -d -r trustRoot -k "${SYSTEM_KEYCHAIN_FILE}" "${ROOTCA_PEM_FILE}"
