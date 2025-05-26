const express = require("express");
const { submitReview, updateReview, deleteReview } = require("../controllers/review.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/books/:id/reviews", protect, submitReview);
router.put("/reviews/:id", protect, updateReview);
router.delete("/reviews/:id", protect, deleteReview);

module.exports = router;
