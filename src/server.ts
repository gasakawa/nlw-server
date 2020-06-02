import express from 'express';
import routes from './routes/routes';
import path from 'path';

const app = express();

app.use(routes);

routes.get('/', (req, res) => {
  res.json(['Gabriel', 'Martin', 'Sandra']);
});

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
