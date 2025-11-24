# Node Boilerplate

A simple and extensible Node.js boilerplate for building RESTful APIs using Express, Sequelize, and JWT authentication.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Mail / Email](#mail--email)
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
-   Email sending (SMTP) with mailer helper and templates

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

3. Create a `.env` file based on the `.env.example` template and configure your database, JWT and mail settings.

## Usage

To start the server, run:

```bash
npm start
```

The server will run on `http://localhost:5500` (or the port specified in your `.env` file).

## Mail / Email

This project includes a simple mailer utility (Nodemailer-based) and mail templates. Use it to send transactional emails (welcome, verification, password reset, etc.).

-   Configuration (set in `.env`):

    -   MAIL_HOST — SMTP host (e.g. smtp.mailtrap.io)
    -   MAIL_PORT — SMTP port (e.g. 587)
    -   MAIL_SECURE — true/false for TLS (usually false for 587)
    -   MAIL_USER — SMTP username
    -   MAIL_PASS — SMTP password
    -   MAIL_FROM — default From address (e.g. "My App <no-reply@myapp.com>")

-   Example mailer usage (service/controller):

    -   Synchronous send:
        mail.send(new WelcomeMail('user@example.com'));
    -   Recommended: send from a background/queue worker for production.

-   Example mail class (project pattern):

    -   WelcomeMail accepts recipient and builds subject + HTML/text using a template.
    -   Mailer exposes send(mailInstance) that resolves when delivered or queued.

-   Testing emails:

    -   Use Mailtrap (or similar) for development: set MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS to Mailtrap values.
    -   Log email output or inspect Mailtrap inbox.

-   Implementation tips:
    -   Keep templates in `app/mails/templates` and load with a simple renderer (e.g. handlebars).
    -   For heavy traffic use a queue (Bull / Bee-Queue) and an email worker.
    -   Always avoid blocking requests while sending emails — return response and enqueue/send asynchronously.

## API Endpoints

### Authentication

-   **POST** `/api/login` - Login a user
-   **POST** `/api/signup` - Register a new user (can trigger welcome email)
-   **GET** `/api/logout` - Logout a user (protected route)

### Users

-   **GET** `/api/users` - List users
-   **PATCH** `/api/users/:id` - Update user (paper-trail audit records changes when `userId` option passed)

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
DB_PASS<db_pass>
DB_NAME=node_boilerplate
DB_DIALECT="mysql"

JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=15
JWT_REFRESH_SECRET=<your_refresh_jwt_secret>
JWT_REFRESH_EXPIRES_IN=10080

# Mail settings
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=<smtp_user>
MAIL_PASS=<smtp_pass>
MAIL_FROM="No Reply <no-reply@example.com>"
```

## Logging

The application uses Winston for logging, with daily rotating log files. Logs can be found in the `logs` directory.

## License

This project is licensed under the MIT License.
