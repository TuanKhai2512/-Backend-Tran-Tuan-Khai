# Express TypeScript Resource Management API

A RESTful API built with Express.js and TypeScript for managing resources with user authentication.

## Features

- User authentication with JWT
- CRUD operations for resources
- PostgreSQL database with Sequelize ORM
- Swagger API documentation
- Docker containerization
- TypeScript implementation

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Environment Setup:
Create a `.env` file in the root directory:
  ```
  PORT=3000
  JWT_SECRET=your-secret-key
  DB_NAME=resources_db
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_HOST=postgres
  DB_PORT=5432
  ```

## Running the Application

### Using Docker:
```bash
docker-compose up
```
### Local Development:
```bash
npm run dev
```

## API Documentation

Swagger documentation available at: `http://localhost:3000/api-docs`

### Endpoints

#### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/signin` - Login user

#### Resources (Requires Authentication)
- GET `/api/resources` - List all resources
- POST `/api/resources` - Create resource
- GET `/api/resources/:id` - Get resource
- PUT `/api/resources/:id` - Update resource
- DELETE `/api/resources/:id` - Delete resource

### Authentication

Include JWT token in request header: 
  Authorization: Bearer <your-token>

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter



## Database Schema

### Users
- id (PRIMARY KEY)
- email (UNIQUE)
- password
- created_at
- updated_at

### Resources
- id (PRIMARY KEY)
- name
- description
- user_id (FOREIGN KEY)
- created_at
- updated_at