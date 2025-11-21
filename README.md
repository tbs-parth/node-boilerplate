# Node Boilerplate

A simple and extensible Node.js boilerplate for building RESTful APIs using Express, Sequelize, and JWT authentication.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Environment Variables](#environment-variables)
-   [Logging](#logging)
-   [License](#license)

## Features

-   RESTful API structure
-   JWT authentication
-   Sequelize ORM for database interactions
-   Middleware for request context management
-   Audit logging for database actions
-   Daily rotating log files

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd node-boilerplate
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file based on the `.env.example` template and configure your database and JWT settings.

## Usage

To start the server, run:

```bash
npm start
```

The server will run on `http://localhost:5500` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

-   **POST** `/api/login` - Login a user
-   **POST** `/api/signup` - Register a new user
-   **GET** `/api/logout` - Logout a user (protected route)

### Logging

Logs are stored in the `logs` directory and are rotated daily.

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

```plaintext
APP_NAME="Express Boilerplate"
PORT=5500
NODE_ENV=development

DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=Root@2019
DB_NAME=node_boilerplate
DB_DIALECT="mysql"

JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=15
JWT_REFRESH_SECRET=<your_refresh_jwt_secret>
JWT_REFRESH_EXPIRES_IN=10080
```

## Logging

The application uses Winston for logging, with daily rotating log files. Logs can be found in the `logs` directory.

## License

This project is licensed under the MIT License.
