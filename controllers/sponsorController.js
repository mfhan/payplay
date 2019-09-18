const express = require('express');
const { Sponsor } = require('../models');
const { hashPassword, genToken, checkPassword } = require('../services/auth');

const sponsorController = express.Router();

// This function makes the response back to the front end when a sponsor logs in or registers.
// We include the json web token as well as the sponsorname and sponsor ID.
// WE DO NOT WANT TO INCLUDE THE PASSWORD OR HASH/DIGEST!
// The less info on the front-end about the sponsor's password, the better.
const buildAuthResponse = (sponsor) => {
  const tokenData = {
    id: sponsor.id,
    sponsorname: sponsor.username,
  };

  const token = genToken(tokenData);

  const sponsorData = {
    sponsorname: sponsor.username,
    id: sponsor.id,
  };

  return {
    sponsor: sponsorData,
    token,
  };
};

// Here we define the sponsor register route.
// We immediately hash the password and never use the original password again.
// Then we add the new sponsor and return our pre-defined response.
sponsorController.post('/auth/register', async (req, res) => {
  try {
    const pwd = await hashPassword(req.body.password);

    const sponsor = await Sponsor.create({
      sponsorname: req.body.username,
      password_digest: pwd,
    });

    const respData = buildAuthResponse(sponsor);

    res.json({ ...respData });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});


// For sponsor login, We first find the sponsor in our database.
// Then we check the hashed form of the password from the login attempt against the password hash in our database.
// If there are no errors, we return our pre-define response to the front end.
sponsorController.post('/login', async (req, res) => {
  try {
    const sponsor = await Sponsor.findOne({
      where: {
        sponsorname: req.body.username,
      },
    });

    if (await checkPassword(req.body.password, sponsor.password_digest)) {
      const respData = buildAuthResponse(sponsor);

      res.json({ ...respData });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});
module.exports = sponsorController;
