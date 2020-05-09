const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(2, (height / 100))
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal (healthy weight)'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

console.log(calculateBmi(186, 87))