const express = require('express');
const Book = require('./models/Book');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all books
app.get('/posts', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new book
app.post('/posts', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a book
app.put('/posts/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a book
app.delete('/posts/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a book by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.send(book);
  } catch (err) {
    res.status(404).send(err);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
