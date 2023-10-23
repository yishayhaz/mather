import styles from "./style.module.scss";
import { LuDelete } from "react-icons/lu";
import { BsSkipEnd } from "react-icons/bs";
import { useEffect, useRef } from "react";

export const keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "del",
  "0",
  "skip",
];

export function Keyboard() {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    let key = e.key;

    if (e.key === "Backspace") {
      console.log("Del");
      key = "del";
    }

    if (e.key === " ") {
      console.log("Skip");
      key = "skip";
    }

    if (e.key === "Enter") {
      console.log("Submit");
      key = "submit";
    }

    if (keyboardRef.current && keys.includes(key)) {
      const button = keyboardRef.current.querySelector(
        `button[name="${key}"]`
      ) as HTMLButtonElement;

      if (button) {
        button.click();
        button.classList.add(styles.active);

        window.addEventListener(
          "keyup",
          () => {
            button.classList.remove(styles.active);
          },
          { once: true }
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.keyboard} ref={keyboardRef}>
      {keys.map((key, idx) => (
        <button key={idx} name={key}>
          {key === "del" ? <LuDelete /> : key === "skip" ? <BsSkipEnd /> : key}
        </button>
      ))}
    </div>
  );
}
