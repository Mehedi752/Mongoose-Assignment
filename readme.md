# 📚 Library Management API

A Library Management System built using **Express**, **TypeScript**, and **MongoDB**. This API allows you to manage books, handle borrowing logic, and retrieve borrowing summaries.

---

## 🚀 Features

- Add, update, delete, and retrieve books
- Borrow books with quantity checks and automatic availability update
- Aggregation-based summary of borrowed books
- Schema validations
- Mongoose instance method and middleware

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, Dotenv
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)

---

## 📁 Project Structure

```
src/
├── app/
│ ├── controllers/ # Route handler logic
│ │ ├── books.controller.ts
│ │ └── borrow.controller.ts
│ ├── models/ # Mongoose schemas and models
│ │ ├── books.model.ts
│ │ └── borrow.model.ts
│ ├── interfaces/ # TypeScript interfaces and enums
│ │ ├── books.interface.ts
│ │ └── borrow.interface.ts
├── app.ts # Express app configuration
├── server.ts # Entry point for server

```

---

## 📦 Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/Mehedi752/Mongoose-Assignment.git
cd Mongoose-Assignment
```

2. **Install Dependencies**
```bash
npm install 
```

3. **Configure Environment Variables**

Create a `.env` file:
```env
MONGODB_URI='mongodb+srv://<db_username>:<db_password></db_password>@cluster0.xk6aw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
```

4. **Run the Server**
```bash
npm run dev
```

---

## 📚 API Endpoints

### 1. Create Book
`POST /api/books`
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
**Response:** 201 Created

### 2. Get All Books
`GET /api/books`
- Supports: `?filter=GENRE&sortBy=createdAt&sort=asc|desc&limit=10`

### 3. Get Book by ID
`GET /api/books/:bookId`

### 4. Update Book
`PUT /api/books/:bookId`
```json
{
  "copies": 50
}
```

### 5. Delete Book
`DELETE /api/books/:bookId`

### 6. Borrow a Book
`POST /api/borrow`
```json
{
  "book": "<book_id>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
- **Business Logic:**
  - Book must exist
  - Must have enough copies
  - Deducts quantity
  - Updates availability (via instance method + middleware)

### 7. Borrowed Books Summary
`GET /api/borrow`
**Returns:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 🧠 Concepts Applied

- **Validation** using Mongoose
- **Business Logic** for borrow control
- **Aggregation Pipeline** for summaries
- **Instance Method**: `updateAvailability`
- **Mongoose Middleware**: `pre` for validation, `post` for sync

---

## 🧪 Error Format Example
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 👨‍💻 Author
- Developed by Mehedi Hasan

