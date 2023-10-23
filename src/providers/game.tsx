import { createContext, useContext, useState } from "react";
import { Exercise, ExerciseType, GameMode } from "../types";
import { genExercise as utilGetExercise } from "../utils";

export type GameContextType = {
  time: GameMode;
  setTime: React.Dispatch<React.SetStateAction<GameMode>>;
  allowedExercises: ExerciseType[];
  setAllowedExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>;
  genExercise: () => Exercise;
};

export const GameContext = createContext<GameContextType>(null as any);

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState<GameMode>("1");
  const [allowedExercises, setAllowedExercises] = useState<ExerciseType[]>([
    "addition",
    "subtraction",
    "multiplication",
    "division",
  ]);

  const genExercise = () => {
    return utilGetExercise(allowedExercises);
  };

  return (
    <GameContext.Provider
      value={{
        time,
        setTime,
        allowedExercises,
        setAllowedExercises,
        genExercise,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
