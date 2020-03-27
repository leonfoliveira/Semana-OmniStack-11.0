const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Sessions
 */
routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  SessionController.create,
);

/**
 * NGOs
 */
routes.get('/ngos', NgoController.index);
routes.post(
  '/ngos',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2),
    }),
  }),
  NgoController.create,
);

/**
 * Profile
 */
routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index,
);

/**
 * Incidents
 */
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index,
);
routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  IncidentController.create,
);
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete,
);

module.exports = routes;
