import { createContext, useContext, useState } from "react";
import { Exercise, ExerciseType, GameMode } from "../types";
import { genExercise as utilGetExercise } from "../utils";

export type PreferencesContextType = {
  time: GameMode;
  setTime: React.Dispatch<React.SetStateAction<GameMode>>;
  allowedExercises: ExerciseType[];
  setAllowedExercises: React.Dispatch<React.SetStateAction<ExerciseType[]>>;
  genExercise: () => Exercise;
};

export const PrefecrencesContext = createContext<PreferencesContextType>(
  {} as PreferencesContextType
);

export function usePreferences() {
  return useContext(PrefecrencesContext);
}

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <PrefecrencesContext.Provider
      value={{
        time,
        setTime,
        allowedExercises,
        setAllowedExercises,
        genExercise,
      }}
    >
      {children}
    </PrefecrencesContext.Provider>
  );
}
