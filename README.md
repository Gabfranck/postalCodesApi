<p align="center">
    <img width="300px" height="300px" src="./assets/logo.png" />
    <h1 align="center"> PostalCodes API </h1>
</p>

## Live Demo

- Search by postal code:

[https://api.postalcodes.dev/codes/search?code=30120&countries=FR](https://api.postalcodes.dev/codes/search?code=30120&countries=FR)

- Search by city name:

[https://api.postalcodes.dev/cities/search?city=Le%20Vigan&countries=FR](https://api.postalcodes.dev/cities/search?city=Le%20Vigan&countries=FR)

- Postal codes by coordinates:

[https://api.postalcodes.dev/codes/near?coord=43.9833,3.6&countries=FR](https://api.postalcodes.dev/codes/near?coord=43.9833,3.6&countries=FR)

- Cities by coordinates:

[https://api.postalcodes.dev/cities/near?coord=43.9833,3.6&countries=FR](https://api.postalcodes.dev/cities/near?coord=43.9833,3.6&countries=FR)

## Usage

### /codes/search

To find postal codes, use the following routes:

`http://localhost:8080/codes/search?code=[YOUR_POSTAL_CODE]&countries=[YOUR_COUNTRY_CODES]`

| Name      | type                      | Requirement           |
| --------- | ------------------------- | --------------------- |
| code      | Postal code               | Required              |
| countries | ISO codes, coma separated | Recommended for speed |
| exact     | boolean (default: false)  | Optional              |

### /codes/near

To find postal codes by coordinates, use the following routes:

`http://localhost:8080/codes/need?coord=[YOUR_COORD]&countries=[YOUR_COUNTRY_CODES]`

| Name      | type                       | Requirement           |
| --------- | -------------------------- | --------------------- |
| coord     | GPS coordinates (lat,long) | Required              |
| radius    | radius in km               | Default: 10, max: 100 |
| countries | ISO codes, coma separated  | Recommended for speed |

### /cities/search

To find postal codes, use the following routes:

`http://localhost:8080/cities/search?city=[YOUR_CITY]&countries=[YOUR_COUNTRY_CODES]`

| Name      | type                     | Requirement           |
| --------- | ------------------------ | --------------------- |
| city      | city name                | Required              |
| countries | ISO code, coma separated | Recommended for speed |

### /cities/near

`http://localhost:8080/cities/need?coord=[YOUR_COORD]&countries=[YOUR_COUNTRY_CODES]`

| Name      | type                       | Requirement           |
| --------- | -------------------------- | --------------------- |
| coord     | GPS coordinates (lat,long) | Required              |
| radius    | radius in km               | Default: 10, max: 100 |
| countries | ISO code, coma separated   | Recommended for speed |

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

API_PORT=8080

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

Unzip dump/postal_codes.sql.zip and import psql dump file postal_codes.sql

```bash
gzip -d < "dump/postal_codes.sql.gz" > "dump/postal_codes.sql"
docker exec -i postalcodesapi-postgresdb-1 psql -d db -U postgres < dump/postal_codes.sql
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

API_PORT=8080

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

### 3. Run docker compose in background mode

```bash
docker compose -f docker-compose-prod.yml up -d
```

### 4. Import database

Unzip dump/postal_codes.sql.zip and import psql dump file postal_codes.sql

```bash
gzip -d < "dump/postal_codes.sql.gz" > "dump/postal_codes.sql"
docker exec -i postalcodesapi-postgresdb-1 psql -d db -U postgres < dump/postal_codes.sql
```

Your server should be up, test it by pinging `[YOUR_DOMAIN]/codes/search?code=30120&countries=FR` for expample.

## Data

Based on 1,826,137 postal codes from Opendatasoft here:

[https://data.opendatasoft.com/explore/dataset/geonames-postal-code%40public/information/](https://data.opendatasoft.com/explore/dataset/geonames-postal-code%40public/information/)

Last update : **2025-04-10**

made with ❤️ by GabFrk
