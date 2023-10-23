import { Navigation } from "./navigation";
import { GameProvider } from "./providers/game";

export default function App() {
  return (
    <GameProvider>
      <Navigation />
    </GameProvider>
  );
}
