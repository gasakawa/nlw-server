import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.json(['Gabriel', 'Martin', 'Sandra']);
});

app.listen(3333);
