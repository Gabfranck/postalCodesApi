<p align="center">
    <img width="300px" height="300px" src="./assets/logo.png" />
    <h1 align="center"> PostalCodes API </h1>
</p>

## Live Demo

- Search by postal code:

[https://postalcodes.dev/postal-codes?code=30120&country=FR](https://postalcodes.dev/postal-codes?code=30120&country=FR)

- Search by city:

[https://postalcodes.dev/postal-codes?city=Le%20Vigan&country=FR](https://postalcodes.dev/postal-codes?city=Le%20Vigan&country=FR)

## Usage

To find postal codes, use the following routes:

- Search by postal code:

`http://localhost:3050/postal-codes?code=[YOUR_POSTAL_CODE]&country=[YOUR_COUNTRY_CODE]`

- Search by city:

`http://localhost:3050/postal-codes?city=[YOUR_CITY]&country=[YOUR_COUNTRY_CODE]`

### Parameters

| Name    | Requirement                        |
| ------- | ---------------------------------- |
| country | Required                           |
| code    | Required if 'city' is not provided |
| city    | Required if 'code' is not provided |

## Installation (Development)

### 1. Run docker compose

```bash
docker compose up
```

### 2. Import database

Unzip dump/postalCodes.sql.zip and import psql dump file postalCodes.sql

```bash
unzip dump/postalCodes.sql.zip dump/postalCodes.sql
docker exec -i postal-code-api-postgresdb-1 psql -d db -U postgres < dump/postalCodes.sql
```

## Installation (Prod)

### 1. Update Nginx config

Replace `postalcodes.dev` mentions in nginx.conf and nginx-ssl.conf by your own domain

### 2. Générate SSL certificate

```bash
docker compose -f docker-compose-prod.yml up
```

Wait for certbot image to generate certificates.

### 3. Replace nginx conf file by SSL one

Replace nginx.conf content with nginx-ssl.conf content

### 4. Run docker compose in background mode

```bash
docker compose -f docker-compose-prod.yml up -d
```

### 5. Import database

Unzip dump/postalCodes.sql.zip and import psql dump file postalCodes.sql

```bash
unzip dump/postalCodes.sql.zip dump/postalCodes.sql
docker exec -i postal-code-api-postgresdb-1 psql -d db -U postgres < dump/postalCodes.sql
```

Your server should be up, test it by pinging your URL

## Data

Based on 1,826,137 postal codes from Opendatasoft here:

[https://data.opendatasoft.com/explore/dataset/geonames-postal-code%40public/information/](https://data.opendatasoft.com/explore/dataset/geonames-postal-code%40public/information/)

Last update : **2025-04-10**
