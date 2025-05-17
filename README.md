# Location Service

A RESTful API service built with NestJS and MongoDB for managing location data.

## Features

- CRUD operations for location data (get list, create, delete)
- MongoDB integration with Mongoose
- Swagger API documentation
- Docker and Docker Compose setup
- CORS enabled

## Tech Stack

- **Backend Framework:** NestJS
- **Database:** MongoDB
- **Documentation:** Swagger/OpenAPI
- **Containerization:** Docker & Docker Compose
- **Validation:** class-validator & class-transformer

## Project Structure

```
location-service/
├── src/
│   ├── main.ts                  # Application entry point
│   ├── app.module.ts            # Root module
│   ├── locations/
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   └── create-location.dto.ts
│   │   ├── schemas/            # MongoDB schemas
│   │   │   └── location.schema.ts
│   │   ├── locations.controller.ts  # API endpoints
│   │   ├── locations.module.ts      # Feature module
│   │   └── locations.service.ts     # Business logic
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Data Model

Each location document contains:

| Field    | Type   | Description                  | Required |
| -------- | ------ | ---------------------------- | -------- |
| address1 | String | First address                | Yes      |
| address2 | String | Second address               | No       |
| lat1     | Number | Latitude of first location   | Yes      |
| long1    | Number | Longitude of first location  | Yes      |
| lat2     | Number | Latitude of second location  | Yes      |
| long2    | Number | Longitude of second location | Yes      |

## API Endpoints

| Method | Endpoint       | Description             | Request Body      | Response           |
| ------ | -------------- | ----------------------- | ----------------- | ------------------ |
| GET    | /locations     | Retrieve all locations  | -                 | Array of locations |
| POST   | /locations     | Create a new location   | CreateLocationDto | Created location   |
| DELETE | /locations/:id | Delete a location by ID | -                 | Deleted location   |

## Installation & Setup

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (optional for local development)

### Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd location-service
   ```

2. Start the application with Docker Compose:

   ```bash
   docker-compose up
   ```

3. The API will be available at http://localhost:3000
4. Swagger documentation will be available at http://localhost:3000/api

### Manual Setup (Without Docker)

1. Install MongoDB and make sure it's running
2. Clone the repository:

   ```bash
   git clone <repository-url>
   cd location-service
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Update MongoDB connection in `src/app.module.ts` to point to your local MongoDB instance

5. Start the application:
   ```bash
   npm run start:dev
   ```

## Usage Examples

### Create a location

```bash
curl -X POST http://localhost:3000/locations \
  -H "Content-Type: application/json" \
  -d '{
    "address1": "123 Main St",
    "address2": "Apt 4B",
    "lat1": 40.7128,
    "long1": -74.0060,
    "lat2": 34.0522,
    "long2": -118.2437
  }'
```

### Get all locations

```bash
curl http://localhost:3000/locations
```

### Delete a location

```bash
curl -X DELETE http://localhost:3000/locations/<location_id>
```

## Development

### Environment Variables

You can customize the application using environment variables:

| Variable    | Description               | Default Value                                             |
| ----------- | ------------------------- | --------------------------------------------------------- |
| MONGODB_URI | MongoDB connection string | mongodb://location-service-mongodb:27017/location-service |
| PORT        | Port the API runs on      | 3000                                                      |

### Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Troubleshooting

### Connection issues between NestJS and MongoDB

If you're experiencing connection issues:

1. Ensure MongoDB container is running:

   ```bash
   docker ps
   ```

2. Check the service names and connection strings:

   - In `docker-compose.yml`, verify service name is `mongodb`
   - In `app.module.ts`, ensure connection string matches the service name

3. Restart containers:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

## License

[MIT](LICENSE)
