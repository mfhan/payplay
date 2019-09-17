const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Salt and secret key values should be hidden in your .env.
// Don't forget to add the .env to your .gitignore otherwise it will be available in your git history.
const SALT_ROUNDS = 11;
const TOKEN_KEY = 'piratesallaboard';

// Creates a hash using bcrypt and our defined salt rounds.
const hashPassword = async (password) => {
  const digest = await bcrypt.hash(password, SALT_ROUNDS);
  return digest;
}

// Builds a token using jwt, the data that we want stored in the token, and a pre-defined secret string.
const genToken = (data) => {
  const token = jwt.sign(data, TOKEN_KEY);
  return token;
};

// Uses bcrypt method to take a password, hash it, and then compare it to another hash.
const checkPassword = async (password, password_digest) => {
  return await bcrypt.compare(password, password_digest);
}

// We added restricted paths to the .post, .put, and .delete requests.
// Then we add the users token to the request headers on the front end, example: { Authorization: `Bearer ${token}`}.
const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_KEY);
    res.locals.user = data;
    next();
  } catch (e) {
    console.log(e);
    res.status(403).send('Unauthorized');
  }
}

module.exports = {
  hashPassword,
  checkPassword,
  genToken,
  restrict,
};
