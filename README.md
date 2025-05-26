Book Review API
A RESTful API built with Node.js and Express.js that allows users to sign up,
log in, add books, submit reviews, and search books.
Authentication is handled using JSON Web Tokens (JWT), and MongoDB is used for data storage.

Features
- User Signup/Login with JWT Authentication
- Add a new book (authenticated users only)
- Get all books with pagination and optional filters (author, genre)
- Get book details by ID (includes average rating and paginated reviews)
- Add, update, or delete reviews (one per user per book)
- Search books by title or author (partial and case-insensitive)


Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment configuration


Project Setup Instructions
1. Clone the repository
git clone https://github.com/disharoy-08/book-management-system.git
cd book-management-system


curl -X POST http://localhost:8080/signup 
-H "Content-Type: application/json" 
-d '{"username": "disha", "password": "disharoy08@"}'

curl -X POST http://localhost:8080/login 
-H "Content-Type: application/json" 
-d '{"username": "disha", "password": "disharoy08@"}'

curl -X POST http://localhost:8080/books 
-H "Authorization: Bearer <jwtToken>" 
-H "Content-Type: application/json" 
-d '{"title": "1984", "author": "George Orwell", "genre": "Dystopian"}'

curl -X GET http://localhost:8080/books/1
curl -X GET "http://localhost:8080/books?page=1&limit=10&author=George%20Orwell"

curl -X POST http://localhost:8080/books/1/reviews \
-H "Authorization: Bearer  <JwtToken>" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Amazing read!"}'


curl -X PUT http://localhost:8080/reviews/1 \
-H "Authorization: Bearer  <JwtToken>" \
-H "Content-Type: application/json" \
-d '{"rating": 4, "comment": "Actually, just great"}'


curl -X DELETE http://localhost:8080/reviews/1 \
-H "Authorization: Bearer <JwtToken>"

curl -X GET "http://localhost:8080/search?q=orwell"

