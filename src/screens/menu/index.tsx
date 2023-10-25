import { useNavigate } from "react-router-dom";
import { Button } from "../../parts/button";
import { useGame } from "../../providers/game";
import { ExerciseType } from "../../types";
import { ALL_TYPES } from "../../utils";
import styles from "./style.module.scss";

export function MenuScreen() {
  const game = useGame();
  const navigate = useNavigate();

  const handleAllowChange = (name: ExerciseType) => {
    if (!game.allowedExercises.includes(name)) {
      game.setAllowedExercises((prev) => [...prev, name] as ExerciseType[]);
    } else {
      game.setAllowedExercises((prev) => prev.filter((type) => type !== name));
    }
  };

  const handleStartGame = () => {
    navigate("/play");
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
        {game.allowedExercises.length === 0 && (
          <small>You must choose at least 1 type of exercises</small>
        )}
        <div className={styles.allowed}>
          {ALL_TYPES.map((type, idx) => (
            <Button
              key={idx}
              size="sm"
              active={game.allowedExercises.includes(type)}
              onClick={() => handleAllowChange(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </section>

      <Button
        onClick={handleStartGame}
        size="lg"
        disabled={game.allowedExercises.length === 0}
      >
        Start Game
      </Button>
    </div>
  );
}
