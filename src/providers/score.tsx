import { createContext, useContext, useEffect, useState } from "react";
import { GameMode } from "../types";

export type ScoreContextType = {
  results: ResultContextType;
  saveScore: (mode: GameMode, score: number) => void;
};

export type ResultContextType = {
  [key in GameMode]?: {
    scores?: number[];
  };
};

export const ScoreContext = createContext<ScoreContextType>(
  {} as ScoreContextType
);

export function useScore() {
  return useContext(ScoreContext);
}

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<ResultContextType>(
    {} as ResultContextType
  );

  const _readResults = (): ResultContextType => {
    const results = localStorage.getItem("results");

    if (!results) return {} as ResultContextType;

    try {
      return JSON.parse(results);
    } catch {
      localStorage.removeItem("results");

      return {} as ResultContextType;
    }
  };

  const saveScore = (mode: GameMode, score: number) => {
    const results = _readResults();

    if (!results[mode]) {
      results[mode] = {
        scores: [],
      };
    }

    results[mode]!.scores?.concat(score)
      .sort((a, b) => b - a)
      .slice(0, 3);

    localStorage.setItem("results", JSON.stringify(results));

    setResults(results);
  };

  useEffect(() => {
    setResults(_readResults());
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        results,
        saveScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}
