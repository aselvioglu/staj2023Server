const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5500;

//const mongoUri = "mongodb+srv://aydinselvioglu:ym22021977@cluster0.ysvlpb7.mongodb.net/";
const mongoUri= "mongodb+srv://aydinselvioglu:ym22021977@cluster0.ysvlpb7.mongodb.net/blog?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const postalarSchema = new mongoose.Schema({
  title: String,
  content: String,
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
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId type



// Function to delete a document by its ID
async function deleteDocumentById(documentId) {
  try {
    const deletedDocument = await Postalar.findByIdAndDelete(documentId);
    if (deletedDocument) {
      console.log('Document deleted:', deletedDocument);
    } else {
      console.log('Document not found.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
const documentIdToDelete = '64d0be753426d08734310062'; 
deleteDocumentById(documentIdToDelete);

//UPDATE

async function updateDocumentById(documentId, updateData) {
  try {
    const updatedDocument = await Postalar.findByIdAndUpdate(
      documentId,
      updateData,
      { new: true }
    );

    if (updatedDocument) {
      console.log('Document updated:', updatedDocument);
    } else {
      console.log('Document not found.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Update example
const documentIdToUpdate = '64d0c1ab3426d08734310065'; 
const updateData = {
  title: 'guncellenen',
  content: 'ornek guncelleme',
  clients: {students: [{name:"ali", id: "23432"}]}
  
};
updateDocumentById(documentIdToUpdate, updateData);


//CREATE
async function createNewDocument(newData) {
  try {
    const newPost = new Postalar(newData);
    const savedPost = await newPost.save();
    console.log('New document created:', savedPost);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Create example
const newData = {
  title: 'New Title',
  content: 'New Content',
  clients: {
    students: [{ name: 'Student Name', id: 123 }],
    mother: [{ name: 'Mother Name', phone: '123-456-7890' }]
  },
  things: {
    ids: [1, 2, 3],
    dates: [1628870400000, 1628956800000, 1629043200000]
  },
  machines: {
    ids: [101, 102],
    dates: [1629139200000, 1629225600000]
  }
};
createNewDocument(newData);

//READ ALL
async function getAllDocuments() {
  try {
    const documents = await Postalar.find({});
    console.log('All documents:', documents);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


getAllDocuments();

//READ BY ID

async function getDocumentById(documentId) {
  try {
    const document = await Postalar.findOne({ 'clients.students.id': documentId });
    
    if (document) {
      console.log('Document found:', document);
    } else {
      console.log('Document not found.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Read by ID Example
const documentIdToRetrieve = "64d0c1ab3426d08734310065"; //the id
getDocumentById(documentIdToRetrieve);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
