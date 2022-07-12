#!/usr/bin/env bash

LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASEPATH="${LOCATION}/../../doubles"

ROOTCA_KEY_FILE="${BASEPATH}/rootCA.key"
ROOTCA_PEM_FILE="${BASEPATH}/rootCA.pem"

openssl genrsa -out "${ROOTCA_KEY_FILE}"  2048 || exit 1
openssl req -x509 -new -nodes -key "${ROOTCA_KEY_FILE}" -sha256 -days 365 -out "${ROOTCA_PEM_FILE}"
