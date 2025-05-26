# Location Service

A RESTful API service built with NestJS and MongoDB for managing location data with user authentication.

## Features

- User authentication with JWT tokens
- User registration and profile management
- CRUD operations for location data (get list, create, delete)
- MongoDB integration with Mongoose
- Docker and Docker Compose setup
- CORS enabled
- Protected and public routes

## Tech Stack

- **Backend Framework:** NestJS
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker & Docker Compose
- **Validation:** class-validator & class-transformer

## Project Structure

```
location-service/
├── src/
│   ├── main.ts                  # Application entry point
│   ├── app.module.ts            # Root module
│   ├── auth/                    # Authentication module
│   │   ├── dto/                 # Auth DTOs
│   │   ├── guards/              # Auth guards
│   │   ├── strategies/          # JWT strategies
│   │   ├── auth.controller.ts   # Auth endpoints
│   │   ├── auth.module.ts       # Auth module
│   │   └── auth.service.ts      # Auth business logic
│   ├── users/                   # User management module
│   │   ├── dto/                 # User DTOs
│   │   ├── schemas/             # User schemas
│   │   ├── users.controller.ts  # User endpoints
│   │   ├── users.module.ts      # User module
│   │   └── users.service.ts     # User business logic
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

## Data Models

### User Model

Each user document contains:

| Field    | Type   | Description        | Required |
| -------- | ------ | ------------------ | -------- |
| email    | String | User email address | Yes      |
| username | String | Unique username    | Yes      |
| password | String | Hashed password    | Yes      |
| role     | Number | Role               | Yes      |

### Location Model

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

### Public Routes (No Authentication Required)

| Method | Endpoint       | Description          | Request Body | Response                                   |
| ------ | -------------- | -------------------- | ------------ | ------------------------------------------ |
| POST   | /auth/register | Register a new user  | RegisterDto  | Access token, refresh token, and user info |
| POST   | /auth/login    | Login existing user  | LoginDto     | Access token, refresh token, and user info |
| POST   | /auth/refresh  | Refresh access token | -            | New access token                           |

### Protected Routes (Authentication Required)

| Method | Endpoint       | Description              | Request Body      | Response           |
| ------ | -------------- | ------------------------ | ----------------- | ------------------ |
| GET    | /auth/profile  | Get current user profile | -                 | User profile       |
| POST   | /auth/logout   | Logout user              | -                 | Success message    |
| GET    | /users/me      | Get detailed user info   | -                 | Detailed user info |
| PUT    | /users/me      | Update user profile      | UpdateUserDto     | Updated user info  |
| GET    | /locations     | Retrieve all locations   | -                 | Array of locations |
| POST   | /locations     | Create a new location    | CreateLocationDto | Created location   |
| DELETE | /locations/:id | Delete a location by ID  | -                 | Deleted location   |

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

2. Create a `.env` file with the required environment variables:

   ```env
   MONGODB_URI=mongodb://location-service-mongodb:27017/location-service
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   ```

3. Start the application with Docker Compose:

   ```bash
   docker-compose up
   ```

4. The API will be available at http://localhost:3000

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

4. Create a `.env` file with the required environment variables (see above)

5. Update MongoDB connection in `src/app.module.ts` to point to your local MongoDB instance

6. Start the application:
   ```bash
   npm run start:dev
   ```

## Usage Examples

### Authentication Examples

#### 1. Register a new user

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "password": "StrongPass123!",
		"role": 1
  }'
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "testuser",
    "role": 1
  }
}
```

#### 2. Login with existing user

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "StrongPass123!"
  }'
```

### 3. Extract tokens from response (using jq - install with: brew install jq)

```bash
ACCESS_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.accessToken')
REFRESH_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.refreshToken')
echo "Access Token: $ACCESS_TOKEN"
echo "Refresh Token: $REFRESH_TOKEN"
```

#### 3. Get user profile

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

#### 4. Get detailed user info

```bash
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

#### 5. Update user profile

```bash
curl -X PUT http://localhost:3000/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "username": "newusername"
  }'
```

#### 6. Refresh access token

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Authorization: Bearer YOUR_REFRESH_TOKEN"
```

#### 7. Logout user

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### Location Management Examples

#### Create a location (Authentication Required)

```bash
curl -X POST http://localhost:3000/locations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "address1": "123 Main St",
    "address2": "Apt 4B",
    "lat1": 40.7128,
    "long1": -74.0060,
    "lat2": 34.0522,
    "long2": -118.2437
  }'
```

#### Get all locations (Authentication Required)

```bash
curl -X GET http://localhost:3000/locations \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

#### Delete a location (Authentication Required)

```bash
curl -X DELETE http://localhost:3000/locations/<location_id> \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

## Development

### Environment Variables

You can customize the application using environment variables:

| Variable           | Description                   | Default Value                                             |
| ------------------ | ----------------------------- | --------------------------------------------------------- |
| MONGODB_URI        | MongoDB connection string     | mongodb://location-service-mongodb:27017/location-service |
| PORT               | Port the API runs on          | 3000                                                      |
| JWT_SECRET         | Secret key for JWT tokens     | your-super-secret-jwt-key-here                            |
| JWT_REFRESH_SECRET | Secret key for refresh tokens | your-super-secret-refresh-key-here                        |

### Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Authentication Flow

1. **Registration/Login**: User registers or logs in and receives access token and refresh token
2. **API Access**: Include access token in Authorization header for protected routes
3. **Token Refresh**: Use refresh token to get new access token when current one expires
4. **Logout**: Invalidate tokens on server side

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Separate access and refresh tokens
- Protected routes with JWT guards
- Input validation and sanitization

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

### Authentication Issues

1. Ensure JWT secrets are properly set in environment variables
2. Check that tokens are included in Authorization header: `Bearer <token>`
3. Verify token hasn't expired - use refresh endpoint if needed

## License

[MIT](LICENSE)
