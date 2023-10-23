import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PlayScreen } from "./screens/play";
import { HomeScreen } from "./screens/home";
import { MenuScreen } from "./screens/menu";

export function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/play" element={<PlayScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
