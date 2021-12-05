const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// Create a scheme for items in the museum: a title and a path to an image.
const bookSchema = new mongoose.Schema({
  title: String,
  descr: String,
});

// Create a model for items in the museum.
const Book = mongoose.model('Book', bookSchema);

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useNewUrlParser: true
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/books', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    descr: req.body.descr,
  });
  try {
    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    let book = await Book.findOne({
      _id: req.params.id
    });
    book.title = req.body.title;
    book.descr = req.body.descr;
    book.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/books', async (req, res) => {
  try {
    let books = await Book.find();
    res.send(books);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));