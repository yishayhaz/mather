import { Button } from "../../parts/button";
import styles from "./style.module.scss";

export function HomeScreen() {
  return (
    <div className={styles.container}>
      <h1>Welcome to mather!</h1>
      <p>
        Practice your math skills with mather. You can practice addition,
        subtraction, multiplication, and division.
      </p>
      <Button to="/menu" size="lg">
        Play
      </Button>
    </div>
  );
}
