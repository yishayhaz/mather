import { usePreferences } from "../../providers/preferences";
import { Keyboard } from "../../parts/keyboard";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Exercise } from "../../types";
import { MAP_TYPE_TO_SYMBOL } from "../../utils";
import { Timer } from "../../parts/timer";
import { Button } from "../../parts/button";
import { useScore } from "../../providers/score";

export function PlayScreen() {
  const preferences = usePreferences();
  const scores = useScore();

  const [exercise, setExercise] = useState<Exercise>();
  const [value, setValue] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [didEnd, setDidEnd] = useState(false);

  const onSubmit = () => {
    if (!exercise || value === null || didEnd) return;

    const shouldBe = eval(
      exercise.numbers.join(MAP_TYPE_TO_SYMBOL[exercise.type])
    );

    if (shouldBe === value) {
      genExercise();
      setScore((prev) => prev + 1);
      setValue(null);
    }
  };

  const handleEnd = () => {
    if ((scores.results[preferences.time]?.scores?.at(-1) ?? 0) < score) {
      scores.saveScore(preferences.time, score);
    }

    setDidEnd(true);
  };

  const genExercise = useCallback(() => {
    setExercise(preferences.genExercise());
  }, [preferences]);

  useEffect(() => {
    genExercise();
  }, [genExercise]);

  return (
    <div className={styles.container}>
      {didEnd ? null : (
        <div className={styles.timer}>
          <Timer
            duration={preferences.time === "1" ? 60 : 180}
            onEnd={handleEnd}
          />
          <span>{score}</span>
        </div>
      )}
      {didEnd ? (
        <div className={styles.end}>
          <h1>Game Over!</h1>
          <p>
            Your score is <strong>{score}</strong> in {preferences.time} minute
            {preferences.time === "1" ? "" : "s"}
          </p>
          <Button to="/menu">Play Again</Button>
        </div>
      ) : (
        exercise && (
          <div className={styles.exercise}>
            {exercise.numbers[0]}
            {MAP_TYPE_TO_SYMBOL[exercise.type]}
            {exercise.numbers[1]}
          </div>
        )
      )}
      {didEnd ? null : (
        <div className={styles.keyboard}>
          <Keyboard value={value} setValue={setValue} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}
