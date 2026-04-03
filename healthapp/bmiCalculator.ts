export function calculateBmi(weight: number, heightCm: number): string {
  const meterHeight = heightCm / 100;
  const bmi = weight / meterHeight ** 2;

  if (bmi < 18.5) {
    return `Under Range`;
  } else if (bmi < 25) {
    return `Normal Range`;
  } else if (bmi < 30) {
    return `Over Range`;
  } else {
    return `Obese`;
  }
}

if (require.main === module) {
  interface MultiplyValues {
    value1: number;
    value2: number;
  }

  const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3]),
      };
    } else {
      throw new Error("Provided values were not numbers!");
    }
  };

  const bmiExtractor = () => {
    const { value1, value2 } = parseArguments(process.argv);

    console.log(calculateBmi(Number(value1), Number(value2)));
  };
  bmiExtractor();

  console.log(calculateBmi(200, 188));
}
