const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env['JWT.SECRET']);
  } catch (err) {
    next(new AuthError('Ошибка авторизации'));
  }
  req.user = payload;
  next();
};
