const express = require('express');
const { restrict , hashPassword, genToken, checkPassword } = require('../services/auth');
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

artistController.post('/', restrict, async (req, res, next) => {
  try {
    const newArtist = await Artist.create(req.body);
    res.json(newArtist);
  } catch (e) {
    next(e);
  }
});

// Getting a single Artist item.
// We also wanted to nest the flavors in the Artist object that belong to that Artist item.
artistController.get('/:id', async (req, res, next) => {
  try {
    const artistItem = await Artist.findByPk(req.params.id);
    res.json({ ...artistItem});
  } catch (e) {
    next(e);
  }
});

// Updating a artist item and returning the newly updated item
artistController.put('/:id', restrict, async (req, res, next) => {
    try {
      const artistItem = await Artist.findByPk(req.params.id);
      await artistItem.update(req.body);
      res.json(artistItem);
    } catch (e) {
      next(e);
    }
  })
// Deleting a artist item. Don't forget to send a response.
// I like to include the ID of the item deleted
artistController.delete('/:id', restrict, async (req, res, next) => {
    try {
      const artistItem = await Artist.findByPk(req.params.id);
      await artistItem.destroy();
      res.status(200).send(`Deleted artist with id ${req.params.id}`);
    } catch (e) {
      next(e);
    }
  });


module.exports = artistController;
