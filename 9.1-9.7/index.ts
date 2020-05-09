import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    res.send({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) return res.status(400).send({ error: 'parameters missing' });
  if (isNaN(Number(target))) return res.status(400).send({ error: 'malformatted parameters' });

  const exercisesAsNumbers = dailyExercises.map((e: string) => Number(e));
  exercisesAsNumbers.forEach((exercises: number) => {
    if (isNaN(exercises)) return res.status(400).send({ error: 'malformatted parameters' });
  });

  const result = calculateExercises(exercisesAsNumbers, target);
  return res.send(result);
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});