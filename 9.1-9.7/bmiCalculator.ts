interface BodyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error('Arguments need to be numbers')

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(2, (height / 100));
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal (healthy weight)'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log(e.message)
}