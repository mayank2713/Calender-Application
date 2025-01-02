const express = require('express');
const Method = require('../models/Method');

const router = express.Router();

// Get all methods
router.get('/', async (req, res) => {
  try {
    const methods = await Method.find().sort('sequence');
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching methods', error });
  }
});

// Add a new method
router.post('/', async (req, res) => {
  try {
    const method = new Method(req.body);
    await method.save();
    res.status(201).json(method);
  } catch (error) {
    res.status(400).json({ message: 'Error adding method', error });
  }
});

// Update a method
router.put('/:id', async (req, res) => {
  try {
    const method = await Method.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(method);
  } catch (error) {
    res.status(400).json({ message: 'Error updating method', error });
  }
});

// Delete a method
router.delete('/:id', async (req, res) => {
  try {
    await Method.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting method', error });
  }
});

module.exports = router;
