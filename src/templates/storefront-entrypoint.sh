#!/bin/sh

# Obtain the JWT token and save it into a variable
TOKEN=$(curl -s -X POST 'http://medusa_server:9000/auth/user/emailpass' \
-H 'Content-Type: application/json' \
--data-raw '{
  "email": "admin@example.com",
  "password": "supersecret"
}' | jq -r '.token')


# Create a publishable API key and retrieve the api_key id from the response
API_KEY_ID=$(curl -s -X POST 'http://medusa_server:9000/admin/api-keys' \
-H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
--data-raw '{
  "title": "Storefront Key",
  "type": "publishable"
}' | jq -r '.api_key.id')

# Get the default Sale channel
SALES_CHANNEL_ID=$(curl -s -X GET "http://medusa_server:9000/admin/sales-channels" \
-H "Authorization: Bearer $TOKEN" | jq -r '.data[0].id')

# Add the key to the default Sale channel
curl -X POST "http://medusa_server:9000/admin/api-keys/$API_KEY_ID/sales-channels" \
-H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
--data-raw "{
  \"add\": [\"$SALES_CHANNEL_ID\"]
}"

# Add a default region and payment method
# {
#   "name": "EU",
#   "countries": [
#     "es"
#   ],
#   "currency_code": "EUR",
#   "payment_providers": [
#     "pp_system_default"
#   ],
#   "automatic_taxes": true,
#   "is_tax_inclusive": false
# }
