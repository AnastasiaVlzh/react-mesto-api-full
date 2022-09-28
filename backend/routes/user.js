const express = require('express');
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/user');

userRoutes.get('/users', express.json(), getUsers);

userRoutes.get('/users/me', express.json(), getUserMe);

userRoutes.get('/users/:userId', express.json(), celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().alphanum().length(24),
  }),
}), getUserById);

userRoutes.patch('/users/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRoutes.patch('/users/me/avatar', express.json(), celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      // eslint-disable-next-line no-useless-escape
      .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/),
  }),
}), updateAvatar);

module.exports = userRoutes;
