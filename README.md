
# Task Management API

A RESTful API built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/) that allows users to manage tasks. It includes user authentication and CRUD operations for tasks, all backed by a PostgreSQL database.

## Features

- User authentication (Signup and Login)
- Task management:
  - Create tasks
  - Retrieve all tasks or a specific task by ID
  - Update task status (e.g., mark as completed)
  - Delete tasks
- PostgreSQL database integration
- Dockerized environment for easy setup

---

## Project Structure

```
src/
├── auth/                # User authentication module
│   ├── dto/             # Data Transfer Objects for auth
│   ├── entities/        # User entity definition
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
├── tasks/               # Task management module
│   ├── dto/             # Data Transfer Objects for tasks
│   ├── entities/        # Task entity definition
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   ├── tasks.service.ts
├── app.module.ts        # Main application module
├── main.ts              # Application entry point
```

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/task-management-api.git
   cd task-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following content:
   ```plaintext
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=nestuser
   DATABASE_PASSWORD=nestpass
   DATABASE_NAME=taskdb
   ```

4. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

5. Access the API:
   The API will be available at `http://localhost:3000`.

---

## API Endpoints

### Authentication Endpoints

#### 1. **Signup**
- **POST** `/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### 2. **Login**
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

---

### Task Management Endpoints

#### 1. **Create Task**
- **POST** `/tasks`
- **Body:**
  ```json
  {
    "title": "Learn NestJS",
    "description": "Understand the basics of NestJS"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Learn NestJS",
    "description": "Understand the basics of NestJS",
    "isCompleted": false
  }
  ```

#### 2. **Get All Tasks**
- **GET** `/tasks`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Learn NestJS",
      "description": "Understand the basics of NestJS",
      "isCompleted": false
    }
  ]
  ```

#### 3. **Get a Task by ID**
- **GET** `/tasks/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Learn NestJS",
    "description": "Understand the basics of NestJS",
    "isCompleted": false
  }
  ```

#### 4. **Update Task**
- **PATCH** `/tasks/:id`
- **Body:**
  ```json
  {
    "isCompleted": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Learn NestJS",
    "description": "Understand the basics of NestJS",
    "isCompleted": true
  }
  ```

#### 5. **Delete Task**
- **DELETE** `/tasks/:id`
- **Response:**
  - Status Code: `200 No Content`

---

## Development

### Running Locally
1. Start PostgreSQL using Docker:
   ```bash
   docker-compose up db
   ```

2. Run the application:
   ```bash
   npm run start:dev
   ```

3. Access the API at `http://localhost:3000`.

### Running Tests
- **Unit Tests**:
  ```bash
  npm run test
  ```
- **E2E Tests**:
  ```bash
  npm run test:e2e
  ```

---

## Docker Setup

### Docker Compose
- `docker-compose.yml` defines two services:
  - `app`: The NestJS API
  - `db`: PostgreSQL database

### Build and Run
```bash
docker-compose up --build
```

---

## Notes

- Avoid storing passwords in plaintext in production. Use encryption libraries like `bcrypt` for better security.
- Disable `synchronize` in TypeORM configuration when deploying to production to avoid accidental data loss.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
