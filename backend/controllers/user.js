const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ServerError = require('../errors/server-err');
const AuthError = require('../errors/auth-err');
const EmailError = require('../errors/email-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    if (err.code === 11000) {
      return next(new EmailError('Пользователь с таким email уже зарегистрирован'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.getUserMe = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Невалидный ID пользователя'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Неправильные почта или пароль'));
    }
    const userValid = await bcrypt.compare(password, user.password);
    if (!userValid) {
      return next(new AuthError('Неправильные почта или пароль'));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.status(200).send({ data: user.toJSON() });
  } catch (err) {
    return next(new ServerError('Произошла ошибка'));
  }
};

// module.exports.logout = (req, res) => {
//   res.clearCookie('jwt');
//   res.send({
//     status: 'Signed out',
//   });
// };

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', { sameSite: "None", secure: true });
    return res.status(200).send({ message: 'Выполнен выход' });
  } catch (err) {
    return next(new ServerError('Произошла ошибка'));
  }
};
