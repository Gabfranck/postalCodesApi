<p align="center">
    <img width="300px" height="300px" src="./assets/logo.png" />
    <h1 align="center"> PostalCodes API </h1>
</p>

## Live Demo

- Search by postal code:

[https://api.postalcodes.dev/cities?code=30120&country=FR](https://api.postalcodes.dev/cities?code=30120&country=FR)

- Search by city:

[https://api.postalcodes.dev/postal-codes?city=Le%20Vigan&country=FR](https://api.postalcodes.dev/postal-codes?city=Le%20Vigan&country=FR)

## Usage

To find postal codes, use the following routes:

- Search by postal code:

`http://localhost:3050/cities?code=[YOUR_POSTAL_CODE]&country=[YOUR_COUNTRY_CODE]`

- Search by city:

`http://localhost:3050/postal-codes?city=[YOUR_CITY]&country=[YOUR_COUNTRY_CODE]`

### Parameters

| Name    | Requirement                        |
| ------- | ---------------------------------- |
| country | Required                           |
| code    | Required if 'city' is not provided |
| city    | Required if 'code' is not provided |

## Installation (Development)

### 1. Update Nginx config and .env(s)

- Create `.env` file

```env
POSTGRESDB_USER=postgres
POSTGRESDB_ROOT_PASSWORD=123456
POSTGRESDB_DATABASE=db
POSTGRESDB_LOCAL_PORT=5432
POSTGRESDB_DOCKER_PORT=5432

CERTBOT_MAIL=yourmail@mail.io

DOMAIN=yourdomain.io

API_REPLICAS=2
```

- Create `server/.env` file

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=db
DB_PORT=5432

API_PORT=8080
```

### 1. Run docker compose

```bash
docker compose -f docker-compose-dev.yml up
```

### 2. Import database

Unzip dump/postalCodes.sql.zip and import psql dump file postalCodes.sql

```bash
unzip dump/postalCodes.sql.zip dump/postalCodes.sql
docker exec -i postal-code-api-postgresdb-1 psql -d db -U postgres < dump/postalCodes.sql
```

## Installation (Prod)

### 1. Update Nginx config and .env(s)

- Replace `api.postalcodes.dev` mentions in nginx-generate-certif.conf and nginx-prod.conf by your own domain

- Create `.env` file

```env
POSTGRESDB_USER=postgres
POSTGRESDB_ROOT_PASSWORD=123456
POSTGRESDB_DATABASE=db
POSTGRESDB_LOCAL_PORT=5432
POSTGRESDB_DOCKER_PORT=5432

CERTBOT_MAIL=yourmail@mail.io

DOMAIN=yourdomain.io

API_REPLICAS=2
```

- Create `server/.env` file

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=db
DB_PORT=5432

API_PORT=8080
```

### 2. Générate SSL certificate

```bash
docker compose -f docker-compose-generate-certif.yml up
```

Wait for certbot image to generate certificates.

### 3. Replace nginx conf file by SSL one

Replace nginx.conf content with nginx-prod.conf content

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

Your server should be up, test it by pinging `[YOUR_DOMAIN]/postal-codes?city=30120&country=FR` for expample.

## Data

Based on 1,826,137 postal codes from Opendatasoft here:

[https://data.opendatasoft.com/explore/dataset/geonames-postal-code%40public/information/](https://data.opendatasoft.com/explore/dataset/geonames-postal-code%40public/information/)

Last update : **2025-04-10**

made with ❤️ by GabFrk
