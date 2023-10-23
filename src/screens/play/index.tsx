import { useGame } from "../../providers/game";
import { Keyboard } from "../../parts/keyboard";
import styles from "./style.module.scss";

export function PlayScreen() {
  const game = useGame();

  return (
    <div className={styles.container}>
      <Keyboard />
    </div>
  );
}
