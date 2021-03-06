const express = require('express');
const { Artist } = require('../models');
const { hashPassword, genToken, checkPassword, restrict } = require('../services/auth');

const userController = express();

const buildAuthResponse = ((user) => {
  const { id, username } = user;
  const tokenData = { id, username };
  const token = genToken(tokenData);
  return { user: { id, username }, token };
});

const stripPassword =(user)=>{
  const {password_digest, ...otherKeys} = user;
  return otherKeys;
}


userController.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const password_digest = await hashPassword(password);
    const user = await Artist.create({ username, email, password_digest });
    const token = buildAuthResponse(user);
    res.json({ user, token });
  } catch (e) {
    next(e);
  }
});

userController.post('/verify', restrict, async (req, res, next) =>{
  try {
    const user = res.locals.user
    const id = user.id;
    const artist = await Artist.findByPk(id)
    const formattedArtist = stripPassword(artist.dataValues)
  
    res.json(formattedArtist);
  } catch (e){
    next(e);
  }
});

userController.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Artist.findOne({
      where: { username },
    });
    if (await checkPassword(password, user.password_digest)) {
      const token = buildAuthResponse(user);
      const formattedUser = stripPassword(user.dataValues);
      res.json({ user: formattedUser, token });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = userController;
