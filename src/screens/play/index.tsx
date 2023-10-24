import { useGame } from "../../providers/game";
import { Keyboard } from "../../parts/keyboard";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Exercise } from "../../types";
import { MAP_TYPE_TO_SYMBOL } from "../../utils";
import { Timer } from "../../parts/timer";

export function PlayScreen() {
  const game = useGame();

  const [exercise, setExercise] = useState<Exercise>();
  const [value, setValue] = useState<number | null>(null);

  const onSubmit = () => {
    setValue(null);
  };

  const genExercise = useCallback(() => {
    setExercise(game.genExercise());
  }, [game]);

  useEffect(() => {
    genExercise();
  }, [genExercise]);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <Timer duration={game.time === "1" ? 60 : 180} onEnd={console.log} />
      </div>
      {exercise && (
        <div className={styles.exercise}>
          {exercise.numbers[0]}
          {MAP_TYPE_TO_SYMBOL[exercise.type]}
          {exercise.numbers[1]}
        </div>
      )}
      <div className={styles.keyboard}>
        <Keyboard value={value} setValue={setValue} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
