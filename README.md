# Postal code API

## Run the System

```bash
docker compose up
```

## Import database

Unzip dump/postalCodes.sql.zip and import psql dump file postalCodes.sql

## Usage

Call route `http://localhost:3050/api/postal-codes?postalCode=[YOUR_POSTAL_CODE]&country=[YOUR_COUNTRY_CODE]`
