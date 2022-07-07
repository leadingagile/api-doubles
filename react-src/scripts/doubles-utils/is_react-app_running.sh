LOCALHOST="localhost.ford.com"
REACT_APP_PORT="3000"
CURL_ADDRESS="$LOCALHOST:$REACT_APP_PORT"

curl --silent $CURL_ADDRESS
if test $? -eq 7 ; then
   echo 'react app not running'
else
   echo "react app running on $REACT_APP_PORT"
fi

