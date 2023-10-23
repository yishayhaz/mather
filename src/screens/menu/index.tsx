import { Button } from "../../parts/button";
import { useGame } from "../../providers/game";
import { ExerciseType } from "../../types";
import { ALL_TYPES } from "../../utils";
import styles from "./style.module.scss";

export function MenuScreen() {
  const game = useGame();

  const handleAllowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      game.setAllowedExercises((prev) => [...prev, value] as ExerciseType[]);
    } else {
      game.setAllowedExercises((prev) => prev.filter((type) => type !== value));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Options</h1>
      <section>
        <h2>Time frame</h2>
        <div className={styles.time}>
          <Button onClick={() => game.setTime("1")} active={game.time === "1"}>
            1 Minute
          </Button>
          <Button onClick={() => game.setTime("3")} active={game.time === "3"}>
            3 Minutes
          </Button>
        </div>
      </section>
      <section>
        <h2>Allowed Exercises</h2>
        <div className={styles.allowed}>
          {ALL_TYPES.map((type, idx) => (
            <label htmlFor={type} key={idx}>
              <input
                name={type}
                id={type}
                type="checkbox"
                checked={game.allowedExercises.includes(type)}
                onChange={handleAllowChange}
                value={type}
                hidden
              />
              {type}
            </label>
          ))}
        </div>
      </section>

      <Button to="/play" size="lg">
        Start Game
      </Button>
    </div>
  );
}
