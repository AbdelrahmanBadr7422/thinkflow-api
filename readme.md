# ThinkFlow Backend API

A **production-ready RESTful API** for a Q&A platform built with **Node.js, Express, TypeScript, and MongoDB**.
Optimized and deployed using **Vercel Serverless Functions**.

Perfect for **portfolio projects**, technical interviews, and showcasing backend engineering skills.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-orange)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)

---

**Part of ThinkFlow Full-Stack Application**

## 🔗 Live URLs

* **Backend API:** [https://thinkflow-api.vercel.app](https://thinkflow-api.vercel.app)
* **Frontend App:** [https://thinkflow-app.vercel.app](https://thinkflow-app.vercel.app) (Coming Soon)
* **API Docs:** [https://thinkflow-api.vercel.app/api-docs](https://thinkflow-api.vercel.app/api-docs)

---

## 📋 Table of Contents

* Features
* Quick Start
* API Documentation
* API Endpoints
* Project Structure
* Testing with cURL
* Deployment (Vercel)
* Tech Stack
* Learning Outcomes
* License

---

## ✨ Features

### 🔐 Authentication & Users

* User registration, login, logout
* JWT-based authentication
* Profile management
* Change password
* Password hashing with bcrypt

### ❓ Questions

* Create, read, update, delete questions
* Fetch questions by author
* Pagination support
* Joi input validation

### 💬 Comments

* Add comments to questions
* Update and delete comments
* Fetch by question or author

### ❤️ Likes

* Like / unlike questions and comments
* Toggle like with single endpoint
* Check if user liked an item
* Count likes

### 🛠 Technical

* TypeScript type safety
* Modular MVC architecture
* Centralized error handling
* Swagger auto-generated docs
* Rate limiting & Helmet security
* Request ID tracing
* Vercel Serverless compatibility

---

## 🚀 Quick Start

### Prerequisites

* Node.js 18+
* MongoDB 6+
* npm

### Installation

```bash
git clone https://github.com/AbdelrahmanBadr7422/thinkflow-api
cd thinkflow-backend
npm install
```

### Environment Variables

Create `.env` file:

```env
NODE_ENV=development
CLIENT_URL=http://localhost:4200

MONGO_URI=mongodb://localhost:27017/thinkflow
JWT_SECRET=your_super_secret_key_here
```
### Run Locally

```bash
npm run dev
```

---

## 📚 API Documentation

* Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)
* JSON: [http://localhost:3000/swagger.json](http://localhost:3000/swagger.json)
* Health: [http://localhost:3000/health](http://localhost:3000/health)

---

## 🔗 API Endpoints

### Auth `/api/v1/auth`

| Method | Endpoint  | Description | Auth |
| ------ | --------- | ----------- | ---- |
| POST   | /register | Register    | No   |
| POST   | /login    | Login       | No   |
| POST   | /logout   | Logout      | Yes  |

### Users `/api/v1/users`

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | /profile         | Get profile     |
| PUT    | /update-profile  | Update profile  |
| PUT    | /change-password | Change password |

### Questions `/api/v1/questions`

| Method | Endpoint          | Auth |
| ------ | ----------------- | ---- |
| GET    | /                 | No   |
| GET    | /:id              | No   |
| GET    | /author/:authorId | No   |
| POST   | /                 | Yes  |
| PUT    | /:id              | Yes  |
| DELETE | /:id              | Yes  |

### Comments `/api/v1/comments`

| Method | Endpoint              | Auth |
| ------ | --------------------- | ---- |
| GET    | /:id                  | No   |
| GET    | /author/:authorId     | No   |
| GET    | /question/:questionId | No   |
| POST   | /                     | Yes  |
| PUT    | /:id                  | Yes  |
| DELETE | /:id                  | Yes  |

### Likes `/api/v1/likes`

| Method | Endpoint               | Auth |
| ------ | ---------------------- | ---- |
| POST   | /toggle                | Yes  |
| GET    | /check                 | Yes  |
| GET    | /questions/:questionId | No   |
| GET    | /comments/:commentId   | No   |

---

## 🏗 Project Structure

```text
thinkflow-backend/
├── api/
│   └── index.ts              # Vercel serverless entry point
├── src/
│   ├── app.ts               # Express app configuration
│   ├── server.ts            # Local dev entry point
│   ├── config/
│   │   ├── database.ts      # MongoDB connection
│   │   ├── env.ts           # Environment validation
│   │   └── swagger.ts       # Swagger documentation
│   ├── common/
│   │   ├── errors/          # Error handling
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── questions/
│       ├── comments/
│       └── likes/
├── .env.example
├── vercel.json              # Vercel configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testing with cURL

Register:

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
 -H "Content-Type: application/json" \
 -d '{"username":"test","email":"test@test.com","password":"Password123"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"test@test.com","password":"Password123"}'
```

Create Question:

```bash
curl -X POST http://localhost:3000/api/v1/questions \
 -H "Authorization: Bearer YOUR_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"title":"Deploy on Vercel","body":"How to deploy Express on Vercel?"}'
```

---

## ☁️ Deployment on Vercel

### Steps

1. Go to **Vercel Dashboard** → **New Project** → Import GitHub repository.
2. Set **Framework Preset** to **Other**.
3. Configure **Environment Variables** in Vercel:

```
NODE_ENV=production
CLIENT_URL=https://thinkflow-app.vercel.app
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key_here
```

4. Vercel will automatically:

   * Run `npm install`
   * Build using `tsc`
   * Deploy using `api/index.ts` as a Serverless Function

5. Access your API at:

```
https://thinkflow-api.vercel.app
```

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express
* TypeScript
* MongoDB + Mongoose
* JWT, bcrypt

**Dev & Ops**

* Vercel Serverless Functions
* Swagger
* Joi
* Helmet
* Rate Limit

---

## 🎯 Learning Outcomes & Skills Demonstrated

### 🏗 Architecture & Design

* Clean MVC / modular architecture
* RESTful API design
* Separation of concerns
* Scalable backend structure

### 🔐 Security & Authentication

* JWT authentication flow
* Secure password handling
* Protected routes & middleware
* Validation and sanitization

### 🗄 Database & Modeling

* MongoDB schema design
* Relationships (questions, comments, likes)
* Indexing & performance considerations

### 🚀 Production Readiness

* Environment-based configuration
* Centralized error handling
* Swagger API documentation
* Cloud deployment on Vercel

---

## 👤 Author

**Abdelrahman Badr**
GitHub: [https://github.com/AbdelrahmanBadr7422](https://github.com/AbdelrahmanBadr7422)
LinkedIn: [https://linkedin.com/in/abdelrahmanbadr74](https://linkedin.com/in/abdelrahmanbadr74)

---

## 📄 License

Educational and portfolio use only.
