[![codecov](https://codecov.io/gh/jyotirmaybanerjee/nodejs-starter/branch/main/graph/badge.svg)](https://codecov.io/gh/jyotirmaybanerjee/nodejs-starter)

# Node.js REST API with TypeScript, JWT Auth, Swagger & Validation

This is a production-ready boilerplate for a RESTful API using **Node.js**, **TypeScript**, **Express**, **JWT authentication**, **Swagger**, and **input validation** with `express-validator`. It's built with scalability, maintainability, and clarity in mind.

---

## 🛠 Tech Stack

- **Node.js** – Runtime environment
- **TypeScript** – Strongly typed JavaScript
- **Express** – Web framework
- **JWT** – Authentication
- **express-validator** – Input validation middleware
- **Swagger** – API documentation
- **dotenv** – Environment variable management
- **morgan** – HTTP request logger
- **winston** – Logging library
- **codecov** – code coverage report
- **Github workflow**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-api.git
cd your-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a .env file in the root directory:
```bash
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server
```bash
npm run dev       # Development with ts-node and nodemon
npm run build     # Transpile TypeScript to JavaScript
npm start         # Run the production build
```

### 📁 Project Structure
```
node-starter/                 # Root of the Node.js TypeScript project
│
├── src/                      # Source code folder
|   ├── auth/                 # Folder for authentication-specific logic
|   │   ├── auth.controller.ts     # Handles login logic (e.g., token generation)
|   │   ├── auth.routes.ts         # Defines the /login route and connects it to controller
|   │   └── auth.middleware.ts     # Middleware for verifying JWT tokens, auth guards, etc.
|   ├── validators/           # Request body validation using express-validator
|   │   └── user.validator.ts      # Defines validation rules for login, user creation, etc.
│   ├── controllers/          # Controllers handle HTTP request/response logic
|   |   ├── hello.controller.ts    # Example controller that returns a "Hello World" response
|   │   └── user.controller.ts     # Handles user-related HTTP logic (GET users, etc.)
|   ├── models/               # TypeScript interfaces or ORM models
|   │   └── user.model.ts          # Defines the User interface (id, username, email, etc.)
|   ├── services/             # Business logic layer (interacts with DB or processes data)
|   │   └── user.service.ts        # Contains logic to get users, authenticate, etc.
│   ├── routes/               # All route definitions
│   │   ├── hello.routes.ts        # Maps /hello route to its controller
|   |   ├── user.routes.ts         # Maps /users route to controller
│   |   └── index.ts               # (Optional) Central file to export and register all routes
│   ├── middlewares/          # Reusable middleware functions
|   |   ├── requestLogger.ts       # Logs HTTP requests using morgan or winston
│   |   └── validate.ts            # Validates incoming requests and handles validation errors
│   ├── services/
│   ├── utils/                # Utility functions or shared helpers
|   |   ├── swagger.ts             # Sets up and exports Swagger UI middleware using swagger-jsdoc and swagger-ui-express
|   |   └── logger.ts              # Winston/morgan logger setup for request and error logging
│   └── index.js              # Application entry point (creates Express app and starts server)
│
├── tests/                    # Folder for unit and integration tests
├── .dockerignore             # Files/folders to ignore when building Docker image
├── .env                      # Environment variables (PORT, JWT_SECRET, etc.)
├── .eslintrc.json            # ESLint config for code linting
├── .gitignore                # Specifies files Git should ignore
├── .prettierignore           # Files/folders Prettier should ignore
├── .prettierrc               # Prettier config for code formatting
├── Dockerfile                # Docker instructions to containerize the app
├── package.json              # Node.js project metadata and dependencies
├── tsconfig.json             # TypeScript compiler configuration
└── README.md                 # Project overview, setup, usage, API docs, etc.
```

```
├── .dockerignore         # Specifies files/folders to exclude when building Docker image (like node_modules, logs, etc.)
├── .env                  # Local environment variables file (not committed); includes secrets like JWT_SECRET, DB_URL, etc.
├── .env.example          # Template for .env; shared with others to show required environment variables
├── .eslintrc.json        # ESLint configuration for linting TypeScript and JS files
├── .gitignore            # Lists files and folders Git should ignore (node_modules, dist, .env, etc.)
├── .prettierignore       # Files/folders Prettier should skip formatting
├── .prettierrc           # Prettier configuration (rules for code formatting: quotes, tabs, line length, etc.)
├── Dockerfile            # Docker instructions for building the Node.js app container
├── README.md             # Project documentation, setup guide, and API usage info
├── package-lock.json     # Automatically generated by npm to lock dependency versions
├── package.json          # Project metadata and scripts; lists dependencies and devDependencies
├── tsconfig.json         # TypeScript compiler configuration (paths, module resolution, strictness, etc.)

├── src/                  # Source code of the application
│   ├── auth/                 # Auth-specific code
│   │   ├── auth.controller.ts     # Handles login logic (e.g., validating credentials, issuing JWT)
│   │   ├── auth.middleware.ts     # JWT authentication middleware
│   │   └── auth.routes.ts         # Route for /login and related auth endpoints
│
│   ├── controllers/          # Controller layer that handles request/response cycle
│   │   ├── hello.controller.ts    # Simple test or health check endpoint
│   │   └── user.controller.ts     # Handles user-related operations (e.g., fetching user list)
│
│   ├── index.ts              # App entry point; initializes Express app, middleware, routes, and server
│
│   ├── middlewares/          # Global or reusable middleware functions
│   │   ├── requestLogger.ts       # Logs all incoming HTTP requests
│   │   └── validate.ts            # Express middleware for validating request bodies and handling errors
│
│   ├── routes/               # Express route definitions
│   │   ├── hello.routes.ts        # Route mapping for /hello
│   │   ├── index.ts              # Combines and exports all route modules
│   │   └── user.routes.ts         # Routes for /users endpoints
│
│   ├── utils/                # Shared utilities/helpers
│   │   ├── logger.ts              # Winston logger setup used for request/error logging
│   │   └── swagger.ts             # Swagger setup using swagger-jsdoc and swagger-ui-express
│
│   └── validators/           # Input validation logic
│       └── user.validator.ts      # Validation rules for user-related requests (e.g., login payload)
```

### 🔐 Authentication
This project uses JWT-based authentication. To access protected routes, first log in and use the token in the Authorization header.

```
Authorization: Bearer <your_token>
```

📄 API Endpoints
✅ /api/login
Method: POST

Body:
```
{
  "username": "admin",
  "password": "admin"
}
```

Response:
```
{
  "token": "jwt_token_here"
}
```

✅ /api/users
Method: GET

Protected: No

Response:
```
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  ]
}
```

📚 Swagger Documentation
Visit http://localhost:3000/api/docs for full Swagger UI.

🧪 Scripts
```
npm run dev       # Start in dev mode
npm run build     # Compile TypeScript
npm start         # Run compiled JavaScript
```

✅ Features
 - ✅ Clean architecture
 - ✅ JWT authentication
 - ✅ Swagger documentation
 - ✅ Modular route and controller separation
 - ✅ Input validation with express-validator
 - ✅ Request logging with Morgan & Winston
 - ✅ Extensible and production-ready setup


### 📬 Contributing
Feel free to fork, enhance, and open pull requests. PRs are welcome!

### 📄 License
This project is licensed under the MIT License.

### 🙌 Author
Built by Jyotirmay Banerjee.
