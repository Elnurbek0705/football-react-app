import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

const lightTheme = {
   name: "light",
   background: "#f9f9f9",
   navbar_bg: "#ffffff",
   border_color: "#e0e0e0",
   text: "#1e1e1e",
   primary: "#8a8a8a",
   inactive_button_bg: "#E5E7EB"
 };
 

const darkTheme = {
  name: "dark",
  background: "#1e1e1e",
  navbar_bg: '#121212',
  border_color: '#fff',
  text: "#ffffff",
  primary: "#490fff",
  inactive_button_bg: '#1F1F1F'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("app-theme");
    return saved === "dark" ? darkTheme : lightTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg-color", theme.background);
    root.style.setProperty("--text-color", theme.text);
    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--navbar-bg", theme.navbar_bg);
    root.style.setProperty("--button-bg", theme.inactive_button_bg);
    root.style.setProperty("--border-color", theme.border_color);


    localStorage.setItem("app-theme", theme.name);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev.name === "light" ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
