import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

const lightTheme = {
  name: "light",
};

const darkTheme = {
  name: "dark",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("app-theme");
    return saved === "dark" ? darkTheme : lightTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme.name === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("app-theme", theme.name);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev.name === "light" ? darkTheme : lightTheme));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
