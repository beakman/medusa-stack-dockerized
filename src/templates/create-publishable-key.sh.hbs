#!/bin/sh

# Exit immediately if any command fails
set -e

# Initialize variables
EMAIL=""
PASSWORD=""
BACKEND_URL=""

# Parse the input arguments
while [ $# -gt 0 ]; do
  case "$1" in
    -e|--email)
      EMAIL="$2"
      shift 2
      ;;
    -p|--password)
      PASSWORD="$2"
      shift 2
      ;;
    -u|--backend-url)
      BACKEND_URL="$2"
      shift 2
      ;;
    *)
      echo "Error: Invalid argument $1"
      exit 1
      ;;
  esac
done

# Check if the required arguments are provided
if [ -z "$EMAIL" ] || [ -z "$PASSWORD" ] || [ -z "$BACKEND_URL" ]; then
  echo "Error: Email, password, and backend URL are required."
  echo "Usage: $0 -e <email> -p <password> -b <backend-url>"
  exit 1
fi

# Obtain the JWT token and save it into a variable
TOKEN=$(curl -s -X POST "$BACKEND_URL/auth/user/emailpass" \
-H 'Content-Type: application/json' \
--data-raw "{
  \"email\": \"$EMAIL\",
  \"password\": \"$PASSWORD\"
}" | jq -r '.token')

# Create a publishable API key and retrieve the api_key id from the response
API_KEY_ID=$(curl -s -X POST "$BACKEND_URL/admin/api-keys" \
-H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
--data-raw '{
  "title": "Storefront Key",
  "type": "publishable"
}' | jq -r '.api_key.id')

API_KEY_TOKEN=$(curl -s -X GET "$BACKEND_URL/admin/api-keys" \
-H "Authorization: Bearer $TOKEN" | jq -r '.api_keys[0].token')

# Get the default Sale channel
SALES_CHANNEL_ID=$(curl -s -X GET "$BACKEND_URL/admin/sales-channels" \
-H "Authorization: Bearer $TOKEN" | jq -r '.sales_channels[0].id')

# Add the key to the default Sale channel
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BACKEND_URL/admin/api-keys/$API_KEY_ID/sales-channels" \
-H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
--data-raw "{
  \"add\": [\"$SALES_CHANNEL_ID\"]
}")

# Check if the request was successful (HTTP status code 200 or 201)
if [ "$STATUS_CODE" -ne 200 ] && [ "$STATUS_CODE" -ne 201 ]; then
  echo "Error: Failed to add the key to the sales channel. HTTP status code: $STATUS_CODE"
  exit 1
fi

# Add a default region
curl -s -o /dev/null -X POST "$BACKEND_URL/admin/regions" \
-H 'Content-Type: application/json' \
-H "Authorization: Bearer $TOKEN" \
--data-raw '{
  "name": "European Union",
  "currency_code": "eur",
  "countries": ["at", "be", "bg", "hr", "cy", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hu", "ie", "it", "lv", "lt", "lu", "mt", "nl", "pl", "pt", "ro", "sk", "si", "es", "se"],
  "automatic_taxes": true
}'

# Return the publishable key
echo $API_KEY_TOKEN