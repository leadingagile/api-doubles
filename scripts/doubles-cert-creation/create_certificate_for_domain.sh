#!/usr/bin/env bash

LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ -z "$1" ]]; then
    echo "Please supply a subdomain to create a certificate for";
    echo "e.g. www.mysite.com"
    exit 1
fi

DOMAIN="$1"
COMMON_NAME="${2:-$1}"

SUBJECT="/C=CA/ST=None/L=NB/O=None/CN=${COMMON_NAME}"
NUM_OF_DAYS=365

BASEPATH="${LOCATION}/../../doubles"
KEY_FILE="${BASEPATH}/device.key"
CSR_FILE="${BASEPATH}/device.csr"
CRT_FILE="${BASEPATH}/device.crt"
EXT_FILE="${BASEPATH}/v3.ext"

DOMAIN_CSR_FILE="${BASEPATH}/${DOMAIN}.csr"
DOMAIN_CST_FILE="${BASEPATH}/${DOMAIN}.crt"

ROOTCA_PEM_FILE="${BASEPATH}/rootCA.pem"
ROOTCA_KEY_FILE="${BASEPATH}/rootCA.key"


if [[ ! -f "${ROOTCA_PEM_FILE}" ]]; then
    echo 'Please run "create_root_cert_and_key.sh" first, and try again!'
    exit 1
fi
if [[ ! -f "${EXT_FILE}" ]]; then
    echo "Please download the '${EXT_FILE}' file and try again!"
    exit 1
fi



# Create a new private key if one doesnt exist, or use the existing one if it does
if [[ -f "${KEY_FILE}" ]]; then
    KEY_OPT="-key"
else
    KEY_OPT="-keyout"
fi



if ! TMP_EXT_FILE="$(mktemp -q "/tmp/$(basename "$0")_V3.XXXXXX")"; then
    exit 2
fi

openssl req -new -newkey rsa:2048 -sha256 -nodes ${KEY_OPT} "${KEY_FILE}" -subj "$SUBJECT" -out "${CSR_FILE}" || exit 21
sed -e s/%%DOMAIN%%/"${COMMON_NAME}"/g "${EXT_FILE}" > "${TMP_EXT_FILE}"
openssl x509 -req -in "${CSR_FILE}" -CA "${ROOTCA_PEM_FILE}" -CAkey "${ROOTCA_KEY_FILE}" -CAcreateserial -out "${CRT_FILE}" -days $NUM_OF_DAYS -sha256 -extfile "${TMP_EXT_FILE}" || exit 22

# move output files to final filenames
mv "${CSR_FILE}" "${DOMAIN_CSR_FILE}"
mv "${CRT_FILE}" "${DOMAIN_CST_FILE}"


echo
echo "###########################################################################"
echo Done!
echo "###########################################################################"
echo "To use these files on your server, simply copy both '${CRT_FILE} and"
echo "${KEY_FILE} to your webserver, and use like so (if Apache, for example)"
echo
echo "    SSLCertificateFile    /path_to_your_files/${DOMAIN}.crt"
echo "    SSLCertificateKeyFile /path_to_your_files/device.key"