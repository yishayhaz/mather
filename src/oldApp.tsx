import { useCallback, useEffect, useState } from "react";
import { Game } from "./game";
import { ExerciseType } from "./types";
import { ALL_TYPES } from "./utils";

function App() {
  const [timer, setTimer] = useState(-1);
  const [allow, setAllow] = useState<ExerciseType[]>([...ALL_TYPES]);

  const startTimer = useCallback(() => {
    setTimer(60);
  }, []);

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        startTimer();
      }
    },
    [startTimer]
  );

  const handleAllowChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;

      if (checked) {
        setAllow((prev) => [...prev, value as ExerciseType]);
      } else {
        setAllow((prev) => prev.filter((type) => type !== value));
      }
    },
    []
  );

  useEffect(() => {
    if (timer < 1) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer !== -1) return;

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [timer, handleEnter, startTimer]);

  return (
    <>
      {timer === 0 && <div>Game over!</div>}

      {timer === -1 && (
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ALL_TYPES.map((type, idx) => (
              <label htmlFor={type} key={idx}>
                <input
                  name={type}
                  id={type}
                  type="checkbox"
                  checked={allow.includes(type)}
                  onChange={handleAllowChange}
                  value={type}
                />{" "}
                {type}
              </label>
            ))}
          </div>
          <br />
          <button onClick={startTimer}>Start</button>
        </div>
      )}

      {timer >= 0 && (
        <>
          {timer}
          <br />
          <Game disabled={timer === 0} allow={allow} />
        </>
      )}
    </>
  );
}

export default App;
