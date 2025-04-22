<p align="center">
    <img width="300px" height="300px" src="./assets/logo.png" />
    <h1 align="center"> PostalCodes API </h1>
</p>

## Demo

Find by code:

[https://postalcodes.dev/postal-codes?code=30120&country=FR](https://postalcodes.dev/postal-codes?code=30120&country=FR)

Find by city:

[https://postalcodes.dev/postal-codes?city=Le%20Vigan&country=FR](https://postalcodes.dev/postal-codes?city=Le%20Vigan&country=FR)

## Run the project

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
