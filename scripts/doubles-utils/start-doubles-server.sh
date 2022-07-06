#!/usr/bin/env bash
PEM_FILE="./doubles/rootCA.pem"
LOCALHOST="https://localhost.ford.com"
DOUBLES_PORT="8001"
DOUBLES_URL="$LOCALHOST:$DOUBLES_PORT"
REACT_APP_PORT="3000"
REACT_APP_URL="$LOCALHOST:$REACT_APP_PORT"

if ! [[ -a "${PEM_FILE}" ]] ; then
    printf '### Please follow instructions to generate the certificate for the doubles server. ###\n\n'
    exit 1
fi

# Set monitor mode so that we can use fg later
set -o monitor

# start the server in the background so that it doesn't block the rest of this script
node doubles/server.js &

# curl with the certificate gets around the issue of the browser not knowing if the server is safe.
# retry is to wait for the server to get started.
if ! curl --silent --retry 5 --retry-connrefused --retry-delay 1 --cacert "${PEM_FILE}" "${REACT_APP_URL}" &> /dev/null ; then
    printf "\n\n### Failed to contact ${REACT_APP_URL} ###\n\n"
    fg %1
    exit 1
fi

# pull the server into the foreground to behave as expected for the user
fg %1
exit 0
