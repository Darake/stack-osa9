interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface ExerciseArgs {
  target: number;
  practiceHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const argsAsNumbers = args.slice(2).map(argv => Number(argv));
  argsAsNumbers.forEach(argv => {
    if (isNaN(argv)) throw new Error('Arguments need to be numbers');
  });

  return {
    target: argsAsNumbers[0],
    practiceHours: argsAsNumbers.slice(1),
  };
};

const getRating = (average: number, target: number): Rating => {
  const ratio = average / target;
  if (ratio < 0.5) return { rating: 1, ratingDescription: 'Can only go up from here' };
  if (ratio < 1) return { rating: 2, ratingDescription: 'Not bad, keep it up!' };
  return { rating: 3, ratingDescription: 'You did great!' };
};

const calculateExercises = (practiceHours: Array<number>, target: number): Result => {
  const periodLength = practiceHours.length;
  const trainingDays = practiceHours.filter(day => day !== 0).length;
  const average = practiceHours.reduce((sum, hours) => sum += hours, 0) / periodLength;
  const calculatedRating = getRating(average, target);
  const success = calculatedRating.rating === 3;

  return {
    periodLength,
    trainingDays,
    success,
    ...calculatedRating,
    target,
    average,
  };
};

try {
  const { target, practiceHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(practiceHours, target));
} catch (e) {
  console.log(e.message);
}