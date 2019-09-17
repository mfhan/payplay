const express = require('express');
const { Sponsor } = require('../models');

const sponsorController = express.Router();

sponsorController.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll();
    console.log("All the talent!")
    res.json(artists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = sponsorController;
