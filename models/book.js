const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookid: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  previewlink: String,
  decsription: String,
  saved:false,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
