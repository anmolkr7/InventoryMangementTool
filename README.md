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

AI tools were used as a **productivity aid** throughout the project. Here’s how:

### 🏗️ Initial Scaffolding

- AI generated initial boilerplate for:
  - Express server (`server.js`)
  - Mongoose connection
  - Controllers and routes structure

### 🔍 Debugging Assistance

- Used AI for:
  - Interpreting error logs (e.g., JWT mismatch, Mongoose CastError)
  - Identifying incorrect Postman HTTP methods

### 🔧 Adapting to Test Scripts

- AI helped align API response structure and routes to match external `test_api.py`, including:
  - Removing `/api` prefix
  - Renaming JWT response key to `access_token`

### 🚢 Dockerization

- AI explained and scaffolded:
  - `Dockerfile`
  - `docker-compose.yml`
- Guided through line-by-line explanations

### 📚 Swagger Documentation

- AI generated JSDoc comments for endpoints
- Helped debug YAML syntax errors in Swagger UI

> 🧠 All **core logic and architecture** was built independently. AI served as a pair programmer and accelerator.

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


