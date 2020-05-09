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

const getRating = (average: number, target: number): Rating => {
  const ratio = average / target;
  if (ratio < 0.5) return { rating: 1, ratingDescription: 'Can only go up from here' }
  if (ratio < 1) return { rating: 2, ratingDescription: 'Not bad, keep it up!' }
  return { rating: 3, ratingDescription: 'You did great!' }
}

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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))