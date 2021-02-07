# NGROK ALTERNATIVE
This is server application for exposing your localhost to public. Can be alternative to ngrok.io maybe.

Ini merupakan aplikasi untuk mengexpose localhost ke server public tanpa harus mendeploy-nya terlebih dahulu. Ini mungkin akan berguna untuk keperluan testing ketika development.

## A. How To

### 1. Requirement
- NodeJS
- NPM

### 2. How to Start
- clone this repository
```shell
git clone https://github.com/haqiramadhani/ngrokserver
```
- move to project directory
```shell
cd ngrokserver
```
- running the app
```shell
npm start
```

### Deploy to Heroku
- coming soon

## B. Routes

### 1. Register for new license
- Endpoint : `/ngrok-admin/register`
- Method : `POST`
- Headers :
  - Content-Type : `application/json`
    
- Body :

```json
{
  "license": "String"
}
```

### 2. Forwarding
- Endpoint : `/:license/*`
- Method : `*`