const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let formData = []; // Array to store multiple form submissions

// Endpoint to handle form submission
app.post('/api/submit-form', (req, res) => {
  const newFormData = req.body;
  formData.push(newFormData); // Add new data to the array
  res.status(200).send('Form data received');
});

// Endpoint to get all form data
app.get('/api/get-form-data', (req, res) => {
  res.json(formData); // Send the array of form data to the front end
});

// Endpoint to delete form data
app.post('/api/delete-form', (req, res) => {
  const dataToDelete = req.body;
  formData = formData.filter(
    (data) => 
      data.name !== dataToDelete.name ||
      data.mailId !== dataToDelete.mailId ||
      data.branch !== dataToDelete.branch ||
      data.rollNumber !== dataToDelete.rollNumber ||
      data.registrationNumber !== dataToDelete.registrationNumber
  );
  res.status(200).send('Form data deleted');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
