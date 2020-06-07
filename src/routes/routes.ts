import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

import PointsController from '../controllers/points.controller';
import ItemsController from '../controllers/items.controller';

const routes = express.Router();
const upload = multer(multerConfig);
const poinstController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), poinstController.create);

routes.get('/points', poinstController.index);

routes.get('/points/:id', poinstController.show);

export default routes;
