const express = require("express");
const { addBook, getBooks, getBookById, searchBooks } = require("../controllers/book.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, addBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);

module.exports = router;

