import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(routes);

routes.get('/', (req, res) => {
  res.json(['Gabriel', 'Martin', 'Sandra']);
});

app.listen(3333);
