import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MAP_TYPE_TO_SYMBOL, genExercise } from "./utils";
import { Exercise, ExerciseType } from "./types";

export type GameProps = {
  disabled: boolean;
  allow: ExerciseType[];
};

export function Game({ disabled, allow }: GameProps) {
  const [exercise, setExercise] = useState<Exercise>(genExercise(allow));
  const [answer, setAnswer] = useState<number>();
  const [score, setScore] = useState(0);

  const ref = useRef<HTMLInputElement>(null);

  const handleGenExercises = useCallback(() => {
    const exercise = genExercise(allow);
    setExercise(exercise);
  }, [allow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (Number.isNaN(Number(value))) return;

    if (value === "") {
      setAnswer(undefined);
      return;
    }

    setAnswer(Number(value));
  };

  const handleWindowFocus = useCallback(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (answer === undefined) return;

    const shouldBe = eval(
      exercise.numbers.join(MAP_TYPE_TO_SYMBOL[exercise.type])
    );

    if (shouldBe === answer) {
      handleGenExercises();
      setAnswer(undefined);
      setScore((prev) => prev + 1);
    }
  }, [answer, exercise, handleGenExercises]);

  useEffect(() => {
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [handleWindowFocus]);

  return (
    <>
      {score}
      <br />
      {exercise.numbers[0]}
      {MAP_TYPE_TO_SYMBOL[exercise.type]}
      {exercise.numbers[1]}
      <input
        autoFocus
        onChange={handleChange}
        value={answer ?? ""}
        ref={ref}
        disabled={disabled}
      />
    </>
  );
}
