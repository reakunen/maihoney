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