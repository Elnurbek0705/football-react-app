import React from "react";
import { useTheme } from "../context/ThemeContex";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeSwitchButton = ({ isLight }) => {
  const { _, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      className={`active button_styles`}
      sx={{
        margin: "0 10px !important",
        color: "#fff",
        transition: "all 0.3s ease",
      }}
    >
      {isLight ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ThemeSwitchButton;
