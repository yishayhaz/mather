import { useEffect } from "react";
import { Navigation } from "./navigation";
import { GameProvider } from "./providers/game";
import { handleClick } from "./utils";

export default function App() {
  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <GameProvider>
      <Navigation />
    </GameProvider>
  );
}
