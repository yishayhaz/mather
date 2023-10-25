import { useGame } from "../../providers/game";
import { Keyboard } from "../../parts/keyboard";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Exercise } from "../../types";
import { MAP_TYPE_TO_SYMBOL } from "../../utils";
import { Timer } from "../../parts/timer";
import { Button } from "../../parts/button";

export function PlayScreen() {
  const game = useGame();

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

  const genExercise = useCallback(() => {
    setExercise(game.genExercise());
  }, [game]);

  useEffect(() => {
    genExercise();
  }, [genExercise]);

  return (
    <div className={styles.container}>
      {didEnd ? null : (
        <div className={styles.timer}>
          <Timer
            duration={game.time === "1" ? 60 : 180}
            onEnd={() => setDidEnd(true)}
          />
          <span>{score}</span>
        </div>
      )}
      {didEnd ? (
        <div className={styles.end}>
          <h1>Game Over!</h1>
          <p>
            Your score is <strong>{score}</strong> in {game.time} minute
            {game.time === "1" ? "" : "s"}
          </p>
          <div className={styles.buttons}>
            <Button onClick={() => console.log(game.allowedExercises)}>
              Save Score
            </Button>
            <Button to="/menu">Play Again</Button>
          </div>
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
