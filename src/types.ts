export type Exercise = {
  numbers: [number, number];
  type: ExerciseType;
};

export type GameMode = "1" | "3";

export type ExerciseType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";
