const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ServerError = require('../errors/server-err');
const CardError = require('../errors/card-err');

module.exports.createCard = async (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные карточки'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.getCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    return res.status(200).send(card);
  } catch (err) {
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const id = req.user._id;
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Такой карточки нет');
    }
    if (id !== card.owner.toString()) {
      throw new CardError('Данная карточка создана не вами');
    }
    const myCard = await Card.findByIdAndDelete(req.params.cardId);
    res.send({ data: myCard });
  } catch (err) {
    next(err);
  }
};

module.exports.putLike = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Такой карточки нет'));
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Некорректные данные запроса'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.deleteLike = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Такой карточки нет'));
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Некорректные данные запроса'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};
