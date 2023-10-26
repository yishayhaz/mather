import { useEffect } from "react";
import { Navigation } from "./navigation";
import { PreferencesProvider } from "./providers/preferences";
import { handleClick } from "./utils";
import { ScoreProvider } from "./providers/score";

export default function App() {
  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <PreferencesProvider>
      <ScoreProvider>
        <Navigation />
      </ScoreProvider>
    </PreferencesProvider>
  );
}
