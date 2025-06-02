Testing the endpoint: 

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Honey", "origin": "California"}' \
  http://localhost:3000/api/test

```

curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"email": "user@dad.com"}'

  curl -X POST https://www.maihoney.com/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "honey": 1
  }'

  
  curl -X POST https://main.d2pgik0qv3x0c5.amplifyapp.com/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartDetails": {
      "item1": {
        "name": "Honey Jar",
        "price": 1500,
        "currency": "usd",
        "quantity": 1
      }
    }
  }'

    curl -X POST https://www.maihoney.com/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartDetails": {
      "item1": {
        "name": "Honey Jar",
        "price": 1500,
        "currency": "usd",
        "quantity": 1
      }
    }
  }'