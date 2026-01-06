# ThinkFlow Backend API

A **production-ready RESTful API** for a Q&A platform built with **Node.js, Express, TypeScript, and MongoDB**.  
Perfect for **portfolio projects**, technical interviews, and showcasing backend engineering skills.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-orange)](https://jwt.io/)
---

**Part of ThinkFlow Full-Stack Application**

## 🔗 Live URLs
- **Backend API:** https://thinkflow-api.onrender.com
- **Frontend App:** https://thinkflow-app.onrender.com (Coming Soon)
- **API Docs:** https://thinkflow-api.onrender.com/docs
---

## 📋 Table of Contents
- Features
- Quick Start
- API Documentation
- API Endpoints
- Project Structure
- Testing with cURL
- Deployment
- Tech Stack
- Learning Outcomes
- License

---

## ✨ Features

### 🔐 Authentication & Users
- User registration, login, logout
- JWT-based authentication
- Profile management
- Change password
- Password hashing with bcrypt

### ❓ Questions
- Create, read, update, delete questions
- Fetch questions by author
- Pagination support
- Joi input validation

### 💬 Comments
- Add comments to questions
- Update and delete comments
- Fetch by question or author

### ❤️ Likes
- Like / unlike questions and comments
- Toggle like with single endpoint
- Check if user liked an item
- Count likes

### 🛠 Technical
- TypeScript type safety
- Modular MVC architecture
- Centralized error handling
- Swagger auto-generated docs
- Rate limiting & Helmet security
- Request ID tracing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm

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
PORT=3000
CLIENT_URL=http://localhost:4200

MONGO_URI=mongodb://localhost:27017/thinkflow

JWT_SECRET=your_super_secret_key_here
```

### Run

```bash
npm run dev
npm run build
npm start
```

---

## 📚 API Documentation

- Swagger UI: http://localhost:3000/docs
- JSON: http://localhost:3000/swagger.json
- Health: http://localhost:3000/health

---

## 🔗 API Endpoints

### Auth `/api/v1/auth`
| Method | Endpoint | Description | Auth |
|--------|----------|------------|------|
| POST | /register | Register | No |
| POST | /login | Login | No |
| POST | /logout | Logout | Yes |

### Users `/api/v1/users`
| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /profile | Get profile |
| PUT | /update-profile | Update profile |
| PUT | /change-password | Change password |

### Questions `/api/v1/questions`
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | / | No |
| GET | /:id | No |
| GET | /author/:authorId | No |
| POST | / | Yes |
| PUT | /:id | Yes |
| DELETE | /:id | Yes |

### Comments `/api/v1/comments`
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /:id | No |
| GET | /author/:authorId | No |
| GET | /question/:questionId | No |
| POST | / | Yes |
| PUT | /:id | Yes |
| DELETE | /:id | Yes |

### Likes `/api/v1/likes`
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /toggle | Yes |
| GET | /check | Yes |
| GET | /questions/:questionId | No |
| GET | /comments/:commentId | No |

---

## 🏗 Project Structure

```text
src/
├── common/
│   ├── errors/
│   ├── middlewares/
│   ├── types/
│   └── utils/
├── config/
│   ├── database.ts
│   ├── env.ts
│   └── swagger.ts
└── modules/
    ├── auth/
    ├── users/
    ├── questions/
    ├── comments/
    └── likes/
```

---

## 🧪 Testing with cURL

Register:
```bash
curl -X POST http://localhost:3000/api/v1/auth/register   -H "Content-Type: application/json"   -d '{"username":"test","email":"test@test.com","password":"Password123"}'
```

Login:
```bash
curl -X POST http://localhost:3000/api/v1/auth/login   -H "Content-Type: application/json"   -d '{"email":"test@test.com","password":"Password123"}'
```

Create Question:
```bash
curl -X POST http://localhost:3000/api/v1/questions   -H "Authorization: Bearer YOUR_TOKEN"   -H "Content-Type: application/json"   -d '{"title":"Deploy on Render","body":"How to deploy Express on Render?"}'
```

---

## ☁️ Deployment on Render

### Steps

1. Go to [Render](https://render.com) → **New** → **Web Service** → Connect your GitHub repo.
2. Set environment variables in Render:
    NODE_ENV=production
    PORT=10000
    CLIENT_URL=https://thinkflow-app.onrender.com

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key_here
3. Set commands in Render:
    Install: npm ci
    Build: npm run build
    Start: npm run start
4. Render will deploy your backend.  
Access your API at: `https://thinkflow-app.onrender.com`

---

## 🛠 Tech Stack

Backend:
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT, bcrypt

Dev & Ops:
- Swagger
- Joi
- Helmet
- Rate Limit

---

## 🎯 Learning Outcomes & Skills Demonstrated

### 🏗️ **Architecture & Design**
- Clean MVC/DAO pattern implementation
- Modular and scalable code structure
- RESTful API design best practices
- Separation of concerns principle

### 🔐 **Security & Authentication**
- JWT-based authentication flow
- Password hashing with bcrypt
- Role-based access control patterns
- Input validation and sanitization

### 🗄️ **Database & Data Modeling**
- MongoDB schema design with Mongoose
- Data relationships (questions, comments, likes)
- Indexing for performance optimization
- Database connection management

### 🚀 **Production Readiness**
- Environment configuration management
- Error handling and logging strategies
- API documentation with Swagger
- Deployment to cloud platforms (Render)

### 🛠️ **Tools & Technologies**
- TypeScript for type-safe development
- Express.js middleware ecosystem
- Modern JavaScript (ES6+) features
- Git version control best practices
---

## 👤 Author

Abdelrahman Badr  
GitHub: https://github.com/AbdelrahmanBadr7422  
LinkedIn: https://linkedin.com/in/abdelrahmanbadr74
---
## 📄 License

Educational and portfolio use only.