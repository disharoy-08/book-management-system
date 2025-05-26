const Book = require("../models/book.model");
const Review = require("../models/review.model");

exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = genre;
  const books = await Book.find(filter).skip((page - 1) * limit).limit(Number(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");
  const avgRating = book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length || 0;
  res.json({ book, avgRating });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({ 
    $or: [
      { title: new RegExp(q, "i") },
      { author: new RegExp(q, "i") }
    ]
  });
  res.json(books);
};
