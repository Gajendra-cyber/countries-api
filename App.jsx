import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {

  return (
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
  );
}

export default App;
