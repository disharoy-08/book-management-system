const Review = require("../models/review.model");
const Book = require("../models/book.model");

exports.submitReview = async (req, res) => {
  const existing = await Review.findOne({ user: req.user._id, book: req.params.id });
  if (existing) return res.status(400).json({ message: "You already reviewed this book" });

  const review = await Review.create({
    user: req.user._id,
    book: req.params.id,
    ...req.body
  });

  await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  await review.deleteOne();
  res.json({ message: "Review deleted" });
};
