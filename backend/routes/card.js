const express = require('express');
const { celebrate, Joi } = require('celebrate');
const cardRoutes = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/card');

cardRoutes.get('/cards', express.json(), getCards);

cardRoutes.post('/cards', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi
      .string()
      .required()
      // eslint-disable-next-line no-useless-escape
      .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/),
  }),
}), createCard);

cardRoutes.delete('/cards/:cardId', express.json(), celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
}), deleteCard);

cardRoutes.put('/cards/:cardId/likes', express.json(), celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
}), putLike);

cardRoutes.delete('/cards/:cardId/likes', express.json(), celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
}), deleteLike);

module.exports = cardRoutes;
