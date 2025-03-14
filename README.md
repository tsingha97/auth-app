# Secure Authentication System with JWT & AWS Deployment

This is a secure authentication system built using **Node.js, Express, MongoDB, and JWT**. It provides features such as user registration, login, password reset, and secure logout.

## Features

✅ User Registration (Signup)  
✅ User Login with JWT Authentication  
✅ Password Reset via Email  
✅ Secure Logout  
✅ HTTP-only Cookies for Authentication  
✅ MongoDB for Database Storage

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/tsingha97/auth-app.git
cd auth-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following variables:

```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5000
NODE_ENV=development
EMAIL_HOST=your_email_host
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM="Your Name your_email@example.com"
```

### 4. Start the Server Locally

```sh
npm start
```

The app will run on **http://localhost:5000**.

## Running Tests

This project uses **Jest** for testing. To run tests, execute:

```sh
npm test
```

## API Endpoints

| Method   | Endpoint                    | Description                       |
| -------- | --------------------------- | --------------------------------- |
| **POST** | `/api/auth/register`        | Register a new user               |
| **POST** | `/api/auth/login`           | Login and get a JWT token         |
| **POST** | `/api/auth/logout`          | Logout user (clears token cookie) |
| **POST** | `/api/auth/forgot-password` | Request password reset            |
| **POST** | `/api/auth/reset-password`  | Reset password using token        |

### 🚀 Happy Coding!
