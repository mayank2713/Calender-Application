const express = require('express');
const Communication = require('../models/Communication');

const router = express.Router();

// Get communications by company ID or date
router.get('/', async (req, res) => {
  try {
    const { companyId, startDate, endDate } = req.query;
    const filter = {};
    if (companyId) filter.companyId = companyId;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const communications = await Communication.find(filter).populate('companyId');
    res.json(communications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching communications', error });
  }
});

// Log a new communication
router.post('/', async (req, res) => {
  try {
    const communication = new Communication(req.body);
    await communication.save();
    res.status(201).json(communication);
  } catch (error) {
    res.status(400).json({ message: 'Error logging communication', error });
  }
});

// Delete a communication
router.delete('/:id', async (req, res) => {
  try {
    await Communication.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting communication', error });
  }
});

module.exports = router;
