import styles from "./style.module.scss";
import { LuDelete } from "react-icons/lu";
import { BsSkipEnd } from "react-icons/bs";
import { useCallback, useEffect, useRef } from "react";

const keys = [
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
  "submit",
];

export type KeyboardProps = {
  max?: number;
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
  onSubmit: () => void;
};

export function Keyboard({
  max = 999,
  value,
  setValue,
  onSubmit,
}: KeyboardProps) {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handleSetValue = (value: number | null) => {
    if (value !== null && value > max) {
      return;
    }

    setValue(value);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let key = e.key;

      if (key === "Enter") {
        return onSubmit();
      }

      if (e.key === "Backspace") {
        key = "del";
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
    },
    [onSubmit]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // so "enter" wouldn't trigger the key again
    e.currentTarget.blur();

    const key = e.currentTarget.name;

    switch (key) {
      case Number.isNaN(Number(key)) ? false : key:
        if (value === null) {
          handleSetValue(Number(key));
        } else {
          handleSetValue(Number(`${value}${key}`));
        }
        break;
      case "del":
        handleSetValue(value ? Math.floor(value / 10) || null : null);
        break;
      case "submit":
        onSubmit();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.keyboard_wrapper}>
      <div className={styles.input}>{value}</div>
      <div className={styles.keyboard} ref={keyboardRef}>
        {keys.map((key, idx) => (
          <button key={idx} name={key} onClick={handleClick}>
            {key === "del" ? (
              <LuDelete />
            ) : key === "submit" ? (
              <BsSkipEnd />
            ) : (
              key
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
