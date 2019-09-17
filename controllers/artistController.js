const express = require('express');
const { Artist } = require('../models');

const artistController = express.Router();

artistController.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    console.log("All the talent!")
    res.json(artists);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = artistController;
