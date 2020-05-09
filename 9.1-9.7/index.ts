import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.send({ error: 'malformatted parameters' });
  } else {
    res.send({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})