const express = require('express');
const Company = require('../models/Company');

const router = express.Router();

router.get('/', async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

router.post('/', async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.status(201).json(company);
});

router.put('/:id', async (req, res) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(company);
});

router.delete('/:id', async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
