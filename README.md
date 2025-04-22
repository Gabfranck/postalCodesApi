# Postal code API

## Run the System

```bash
docker compose up
```

## Import database

Unzip dump/postalCodes.sql.zip and import psql dump file postalCodes.sql

## Usage

Call route `http://localhost:3050/postal-codes?code=[YOUR_POSTAL_CODE]&country=[YOUR_COUNTRY_CODE]`

or

Call route `http://localhost:3050/postal-codes?city=[YOUR_CITY]&country=[YOUR_COUNTRY_CODE]`

### Params

| name    | required                           |
| ------- | ---------------------------------- |
| country | required                           |
| code    | required if 'city' is not provided |
| city    | required if 'code' is not provided |
