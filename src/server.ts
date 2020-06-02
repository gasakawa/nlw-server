import express from 'express';
import routes from './routes/routes';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
