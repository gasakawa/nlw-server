import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from '../controllers/points.controller';
import ItemsController from '../controllers/items.controller';

const routes = express.Router();
const upload = multer(multerConfig);
const poinstController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys(
      {
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      },
      {
        abortEarly: false,
      },
    ),
  }),
  poinstController.create,
);

routes.get('/points', poinstController.index);

routes.get('/points/:id', poinstController.show);

export default routes;
