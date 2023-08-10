const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

//const mongoUri = "mongodb+srv://aydinselvioglu:********@cluster0.ysvlpb7.mongodb.net/";
const mongoUri= "mongodb+srv://aydinselvioglu:*********@cluster0.ysvlpb7.mongodb.net/blog?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const postalarSchema = new mongoose.Schema({
  clients: {
    students: [{ name: String, id: Number }],
    mother: [{ name: String, phone: String }]
  },
  things: {
    ids: [Number],
    dates: [Number]
  },
  machines: {
    ids: [Number],
    dates: [Number]
  }
});

const Postalar = mongoose.model('Postalar', postalarSchema, 'postalar');

app.get('/', async (req, res) => {
  try {
    const documents = await Postalar.find({});
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred in GET' });
  }
});

app.post('/create', async (req, res) => {
  try {
    const newData = {
      title: "new data",
      content:" new one has been created"
    };
    
    const newPost = new Postalar(newData);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred in POST' });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = {
      title: "updated",
      content: "the documment updated"
    };
    
    const updatedPost = await Postalar.findByIdAndUpdate(postId, updateData, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred in UPDATE' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Postalar.findByIdAndDelete(postId);
    res.json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
