import { useEffect, useState } from "react";
import NotesProvider from "./context/NotesContext";
import Home from "./pages/Home";
import "./styles/App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  
  return (
    <NotesProvider>
      <div className="app-container">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
        <Home />
      </div>
    </NotesProvider>
  );
}

export default App;
