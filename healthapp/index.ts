import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isArrayOfNumbers, isNotNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const bmi = calculateBmi(Number(weight), Number(height));

  res.json({ height: Number(height), weight: Number(weight), bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }
  if (isNotNumber(target) || !isArrayOfNumbers(daily_exercises)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const result = calculateExercises(daily_exercises, Number(target));
  res.json(result);
});

app.listen("3000", () => {
  console.log("server running on http://localhost:3000");
});
