const express = require('express');
const Text = require('./models/Text');

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// GET /api/text - Retrieve the saved text value
router.get('/text', async (req, res) => {
  try {
    const textDoc = await Text.findOne();
    if (textDoc) {
      res.json({ value: textDoc.value });
    } else {
      res.json({ value: '' });
    }
  } catch (error) {
    console.error('Error fetching text:', error);
    res.status(500).json({ message: 'Failed to fetch text value' });
  }
});

// POST /api/text - Save or update the text value
router.post('/text', async (req, res) => {
  try {
    const { value } = req.body;
    if (value === undefined || value === null) {
      return res.status(400).json({ message: 'Text value is required' });
    }

    let textDoc = await Text.findOne();
    if (textDoc) {
      textDoc.value = value;
      textDoc.updatedAt = Date.now();
    } else {
      textDoc = new Text({ value });
    }

    await textDoc.save();
    res.status(200).json({ message: 'Text saved successfully', value });
  } catch (error) {
    console.error('Error saving text:', error);
    res.status(500).json({ message: 'Failed to save text value' });
  }
});

module.exports = router;
