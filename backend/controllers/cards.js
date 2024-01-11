const Card = require('../models/card');

// Return all Cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// Create New Card
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch(next);
};

// Delete existing card
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId, owner: req.user._id })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// Like card
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  // console.log(cardId);
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

// Unlike card
module.exports.unlikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};
