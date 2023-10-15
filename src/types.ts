export type Exercise = {
  numbers: [number, number];
  type: ExerciseType;
};

export type ExerciseType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";
