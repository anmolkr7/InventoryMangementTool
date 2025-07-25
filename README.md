# Inventory Management Backend

A small backend application built with **Node.js**, **Express**, and **MongoDB** to manage inventory for a small business. The app exposes a **RESTful API** for user and product management.

---

## 🚀 Features

- **User Authentication**: Secure JWT-based login system.
- **Product Management**:
  - Add new products to the inventory.
  - Update the quantity of existing products.
  - Retrieve a list of all products.
- **Dockerized Environment**: Spin up the app and database in one command using Docker Compose.
- **Validation**: Robust server-side validation for all incoming data.
- **Error Handling**: Graceful error responses for invalid inputs or server issues.

---

## 🧰 Technology Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Containerization**: Docker, Docker Compose  
- **Authentication**: JSON Web Tokens (JWT)  
- **Password Hashing**: bcrypt.js

---

## ⚙️ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
- [Git](https://git-scm.com/downloads) for cloning the repository.

---

## 🛠️ Setup and Installation

### ✅ Running with Docker (Recommended)

This is the simplest and recommended way to get the application running. It automatically sets up both the Node.js server and MongoDB.

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd inventory-backend
   ```

2. **Start the Application**

   ```bash
   docker-compose up
   ```

   This command will:
   - Build the Node.js application image
   - Pull the MongoDB image
   - Start both containers

   Access the API at: `http://localhost:5000`  
   Swagger Docs: `http://localhost:5000/api-docs`

   > To stop the application: Press `Ctrl + C`

---

### 🧪 Running Manually (Without Docker)

Ensure that **Node.js** and **MongoDB** are installed on your system.

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Create a `.env` file in the project root:

   ```env
   # Server Configuration
   PORT=5000

   # MongoDB Connection URI
   MONGODB_URI=mongodb://localhost:27017/inventory_app

   # JWT Secret Key
   JWT_SECRET=your_super_secret_jwt_key_12345
   ```

3. **Start the Server**

   ```bash
   npm start
   ```

---

## 📡 API Endpoints

> Base URL: `http://localhost:5000`  
> Docs: `http://localhost:5000/api-docs`

### 🔐 Authentication

#### `POST /register`

Registers a new user.  
**Request Body**:
```json
{ "username": "user", "password": "password" }
```

**Success (201)**:  
Returns an `access_token`.

---

#### `POST /login`

Logs in an existing user.  
**Request Body**:
```json
{ "username": "user", "password": "password" }
```

**Success (200)**:  
Returns an `access_token`.

---

### 📦 Products

> **All routes below require Authorization Header:**  
> `Authorization: Bearer <access_token>`

#### `POST /products`

Add a new product.

**Success (201)**:  
Returns the created product’s ID as `product_id`.

---

#### `PUT /products/:id/quantity`

Update a product’s quantity.  
**Request Body**:
```json
{ "quantity": 25 }
```

**Success (200)**:  
Returns updated quantity.

---

#### `GET /products`

Retrieve all products.

**Success (200)**:  
Returns an array of product objects.

---

## 🧠 AI Usage Disclosure

In line with promoting smart development practices, **AI tools were used as a productivity aid** throughout this project. This section outlines the specific scenarios where AI contributed meaningfully without replacing the core development and decision-making process.

### 🏗️ Initial Scaffolding and Boilerplate

To accelerate setup, AI was used to generate:
- The basic structure of the Express server (`server.js`)
- A standard Mongoose connection pattern
- Initial boilerplate for controllers and route files

This provided a clean foundation for building out the rest of the application.

### 🐞 Iterative Debugging and Problem-Solving

AI acted as a "pair programmer" during debugging by helping interpret error logs and propose fixes. Some key examples include:

- **"Invalid Token" Error**:  
  When authenticated routes were failing, AI guided me to insert `console.log` statements inside both the token creation (`loginUser`) and verification (`authMiddleware`). This revealed that the payload used `id` while the middleware was checking for `userId`, leading to the bug fix.

- **Mongoose CastError**:  
  When using an invalid product ID like `invalid12345`, the server responded with a generic `500` error. After sharing the stack trace, AI identified this as a Mongoose `CastError` and suggested checking ID validity using:  
  ```js
  mongoose.Types.ObjectId.isValid(id)
  ```  
  This led to improved and more user-friendly error handling.

### 🔄 Adapting to External Requirements

Upon introducing the `test_api.py` script, AI was prompted to compare the API responses against the test expectations. This "diff" exercise helped systematically identify all necessary changes:
- Removed the `/api` prefix from routes
- Renamed `token` to `access_token` in login/register responses
- Aligned JSON response formats to match test script requirements

### 🚢 Implementing Stretch Goals

- **Dockerization**:  
  Being new to Docker, I used AI to explain foundational concepts. It then generated an initial `Dockerfile` and `docker-compose.yml`, with line-by-line explanations. This enabled successful containerization of the app and MongoDB service.

- **Swagger Documentation**:  
  AI generated the required JSDoc comments for Swagger. When faced with YAML syntax errors via `swagger-jsdoc`, I provided error logs and AI helped debug and fix formatting issues within the route files.

---

### 🧭 Final Note

> While AI accelerated certain tasks, all core logic, architectural decisions, and development direction were led by my own understanding. AI served as a tool for **faster debugging, learning new technologies**, and **streamlining repetitive tasks** like documentation.


---

## ✅ Test Script Verification

The project was tested using a `test_api.py` script under both manual and Docker setups.  
All tests **passed successfully**, verifying:

```text
--- Starting API Test Suite ---
User Registration: PASSED
User Login: PASSED
Add Product: PASSED
Update Quantity: PASSED, Updated quantity is correct: 15
Get Products: PASSED (Verified quantity = 15)
--- Test Suite Finished ---
```

---


