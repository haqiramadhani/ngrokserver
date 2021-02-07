# NGROK ALTERNATIVE
This is server application for exposing your localhost to public. Can be alternative to ngrok.io maybe.

## A. Routes

### 1. Register for new license
- Endpoint : `/ngrok-admin/register`
- Method : `POST`
- Headers :
  - License : `String`
  - Content-Type : `application/json`
    
- Body :

```json
{
  "license": "String"
}
```

### 2. Forwarding
- Endpoint : `ALL`
- Method : `ALL`
- Headers :
  - License : `String`