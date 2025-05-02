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
src/
├── controllers/        # Route logic
├── middlewares/        # JWT, validators, etc.
├── routes/             # Route definitions
├── utils/              # Logger, helpers
├── index.ts            # App entry point
├── swagger.json        # Swagger API schema
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

```yaml

---

Would you like me to generate a basic Swagger JSON file or a `.env.example` to go along with this?
```