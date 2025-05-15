# Personal Organizer Backend

This repository contains the **backend server** for the Personal Organizer project. It is built using **Node.js**, **Express**, and **PostgreSQL**. It provides RESTful APIs for user authentication, task management, and event scheduling.

## Frontend

You can find the corresponding frontend project with full integration details and UI [**here**](https://github.com/Jack-18888/Task-and-Event-Organizer).

## Features

- User registration and authentication using JWT
- CRUD operations for tasks and events
- PostgreSQL integration for persistent storage
- Protected routes for authorized users only

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```ini
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
node server.js
```

## API Endpoints

### Auth

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive a JWT

### Tasks

- `GET /tasks` – Retrieve user tasks
- `POST /tasks` – Create a new task
- `PUT /tasks/:id` – Update a task
- `DELETE /tasks/:id` – Delete a task

### Events

- `GET /events` – Retrieve user events
- `POST /events` – Create a new event
- `PUT /events/:id` – Update an event
- `DELETE /events/:id` – Delete an event

## License

This project is licensed under the MIT License.
