# Node Boilerplate

A simple and extensible Node.js boilerplate for building RESTful APIs using Express, Sequelize, and JWT authentication.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Validation & File Uploads](#validation--file-uploads)
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
-   Audit logging for database actions (sequelize-paper-trail)
-   Email sending (SMTP) with mailer helper and templates
-   Request validation with `express-validator`
-   File upload handling with `express-fileupload`

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

3. Install validation and upload packages:

    ```bash
    npm install express-validator express-fileupload
    ```

4. Create a `.env` file based on the `.env.example` template and configure your database, JWT and mail settings.

## Usage

To start the server, run:

```bash
npm start
```

The server will run on `http://localhost:5500` (or the port specified in your `.env` file).

## Validation & File Uploads

This project uses `express-validator` for request validation and `express-fileupload` for simple file uploads. Below are quick usage notes and examples.

Installation
```bash
npm install express-validator express-fileupload
```

Mounting middleware (example in app bootstrap)
```javascript
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// body parser
app.use(express.json());

// file upload
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  abortOnLimit: true,
  createParentPath: true
}));
```

express-validator example (route)
```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/signup', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password too short')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  // proceed with signup
});
```

express-fileupload example (controller)
```javascript
app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).json({ message: 'No file uploaded' });

  const file = req.files.file;
  const uploadPath = path.join(__dirname, '..', 'uploads', file.name);

  await file.mv(uploadPath); // move to uploads folder
  return res.json({ message: 'File uploaded', path: `/uploads/${file.name}` });
});
```

Security & best practices
- Validate file type/size on server side.
- Store uploads outside webroot or use a dedicated storage (S3).
- Scan uploaded files if necessary.
- For heavy workloads use streaming upload handlers or a queue.

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

-   Testing emails:

    -   Use Mailtrap (or similar) for development: set MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS to Mailtrap values.
    -   Log email output or inspect Mailtrap inbox.

## API Endpoints

### Authentication

-   **POST** `/api/login` - Login a user
-   **POST** `/api/signup` - Register a new user (can trigger welcome email)
-   **GET** `/api/logout` - Logout a user (protected route)

### Users

-   **GET** `/api/users` - List users
-   **PATCH** `/api/users/:id` - Update user (paper-trail audit records changes when `userId` option passed)

### File Uploads

-   **POST** `/api/upload` - Upload a file (requires `express-fileupload` middleware)

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

```plaintext
APP_NAME="Express Boilerplate"
PORT=5500
NODE_ENV=development

DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=<db_pass>
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