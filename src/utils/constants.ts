import { ExerciseType } from "../types";

export const MAX_ADDITION = 999;
export const MAX_SUBTRACTION = 999;
export const MIN_MULTIPLICATION_TYPE_1 = 100;
export const MAX_MULTIPLICATION_TYPE_1 = 999;
export const MIN_MULTIPLICATION_TYPE_2 = 10;
export const MAX_MULTIPLICATION_TYPE_2 = 99;

export const MIN_DIVISION_A = 1;
export const MAX_DIVISION_A = 100;
export const DIVISION_TEMP = 100;
export const MIN_DIVISION_B = 2;

export const MAP_TYPE_TO_SYMBOL = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
};

export const ALL_TYPES: ExerciseType[] = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
];
