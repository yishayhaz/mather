import { Exercise, ExerciseType } from "../types";
import {
  DIVISION_TEMP,
  MAX_ADDITION,
  MAX_DIVISION_A,
  MAX_SUBTRACTION,
  MIN_DIVISION_A,
  MIN_DIVISION_B,
} from "./constants";
import { genRandomBetween } from "./random";

export const genExercise = (allow: ExerciseType[]): Exercise => {
  const type = allow[genRandomBetween(0, allow.length - 1)];

  switch (type) {
    case "addition":
      return {
        numbers: genAddition(),
        type: "addition",
      };
    case "subtraction":
      return {
        numbers: genSubtraction(),
        type: "subtraction",
      };
    case "multiplication":
      return {
        numbers: genMultiplication(),
        type: "multiplication",
      };
    case "division":
    default:
      return {
        numbers: genDivision(),
        type: "division",
      };
  }
};

export const genAddition = (): [number, number] => {
  const a = genRandomBetween(2, MAX_ADDITION);

  return [a, genRandomBetween(1, 1000 - a)];
};

export const genSubtraction = (): [number, number] => {
  const a = genRandomBetween(1, MAX_SUBTRACTION);

  return [a, genRandomBetween(1, a)];
};

export const genMultiplication = (): [number, number] => {
  const a = genRandomBetween(2, 99);
  const temp = Math.floor(999 / a);
  const b = genRandomBetween(2, temp);

  return [a, b];
};

export const genDivision = (): [number, number] => {
  const a = genRandomBetween(MIN_DIVISION_A, MAX_DIVISION_A);
  const temp = Math.floor(DIVISION_TEMP / a);
  const b = genRandomBetween(MIN_DIVISION_B, temp);

  return [a * b, a];
};
