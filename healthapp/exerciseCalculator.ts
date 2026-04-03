type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

interface ExerciseValue {
  target: number;
  values: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValue => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const [value1, value2, value3, ...values] = args;

  console.log(value1, value2);

  const hours: number[] = [];

  values.forEach((value) => {
    console.log(value);
    if (!isNaN(Number(value))) {
      hours.push(Number(value));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  });

  return {
    target: Number(value3),
    values: hours,
  };
};

export function calculateExercises(
  dailyHours: number[],
  target: number,
): Result {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent, target achieved!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You need to push harder";
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const exerciseExtractor = () => {
  const { target, values } = parseExerciseArguments(process.argv);

  console.log(calculateExercises(values, target));
};
if (require.main === module) {
  exerciseExtractor();
}
