require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Define a Person schema
const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  DOB: String,
  homeNumber: String,
  mobileNumber: String,
  emergencyContact: String,
  emergencyContactNumber: String,
  premierDraw: String,
  juniorParent: String,
  firstChild: String,
  secondChild: String,
  thirdChild: String,
  fourthChild: String,
  player: String,
  ladies: String,
  committee: String,
  lifeMember: String,
  trustee: String,
  elves: String,
  coach: String,
  patron: String,
  dinnerInvite: String,
});

const Person = mongoose.model('Person', personSchema);

// Get all persons
app.get('/api/persons', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new person
app.post('/api/persons', async (req, res) => {
  try {
    const newPerson = await Person.create(req.body);
    res.json(newPerson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a person
app.put('/api/persons/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a person
app.delete('/api/persons/:id', async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
