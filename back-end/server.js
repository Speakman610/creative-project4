const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  descr: String,
});

const Book = mongoose.model('Book', bookSchema);

const movieSchema = new mongoose.Schema({
  title: String,
  rating: String,
  runtime: String,
  descr: String,
});

const Movie = mongoose.model('Movie', movieSchema);

const gameSchema = new mongoose.Schema({
  title: String,
  numPlayers: String,
  playTime: String,
  descr: String,
});

const Game = mongoose.model('Game', gameSchema);

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/catalog', {
  useNewUrlParser: true
});

app.post('/api/books', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
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
    book.author = req.body.author;
    book.descr = req.body.descr;
    book.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/books', async (req, res) => {
  try {
    let books = await Book.find();
    res.send(books);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/movies', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    rating: req.body.rating,
    runtime: req.body.runtime,
    descr: req.body.descr,
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    await Movie.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/movies/:id', async (req, res) => {
  try {
    let movie = await Movie.findOne({
      _id: req.params.id
    });
    movie.title = req.body.title;
    movie.rating = req.body.rating;
    movie.runtime = req.body.runtime;
    movie.descr = req.body.descr;
    movie.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/movies', async (req, res) => {
  try {
    let movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/games', async (req, res) => {
  const game = new Game({
    title: req.body.title,
    numPlayers: req.body.numPlayers,
    playTime: req.body.playTime,
    descr: req.body.descr,
  });
  try {
    await game.save();
    res.send(game);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/games/:id', async (req, res) => {
  try {
    await Game.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/games/:id', async (req, res) => {
  try {
    let movie = await Game.findOne({
      _id: req.params.id
    });
    game.title = req.body.title;
    game.numPlayers = req.body.numPlayers;
    game.playTime = req.body.playTime;
    game.descr = req.body.descr;
    game.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/games', async (req, res) => {
  try {
    let games = await Game.find();
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));