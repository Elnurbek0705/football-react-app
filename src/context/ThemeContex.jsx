import { createContext, useState, useContext, useEffect } from "react";
import carouselBg from "../assets/carousel_bg.svg";
import carouselLightBg from "../assets/carousel_light_bg.svg";

const ThemeContext = createContext();

const lightTheme = {
  name: "light",
  background: "#f9f9f9",
  navbar_bg: "#ffffff",
  border_color: "#e0e0e0",
  text: "#1e1e1e",
  primary: "#8a8a8a",
  inactive_button_bg: "#E5E7EB",
  carousel_bg: `url(${carouselLightBg})`,
};

const darkTheme = {
  name: "dark",
  background: "#0B090A",
  navbar_bg: "#121212",
  border_color: "#fff",
  text: "#ffffff",
  primary: "#490fff",
  inactive_button_bg: "#1F1F1F",
  carousel_bg: `url(${carouselBg})`,
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
    root.style.setProperty("--bg-color", theme.background);
    root.style.setProperty("--text-color", theme.text);
    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--navbar-bg", theme.navbar_bg);
    root.style.setProperty("--button-bg", theme.inactive_button_bg);
    root.style.setProperty("--border-color", theme.border_color);
    root.style.setProperty("--carousel-bg", theme.carousel_bg);

    localStorage.setItem("app-theme", theme.name);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev.name === "light" ? darkTheme : lightTheme));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
