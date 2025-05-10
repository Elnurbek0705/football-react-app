import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";
import { logo, logoDark } from "../constants";
import ThemeSwitchButton from "./ThemeSwitchButton";
import styles from "../constants/styles";
import { useTheme } from "../context/ThemeContex";
import "./style.css";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, _ } = useTheme();
  const isLight = theme.name === "light";

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Table", path: "/table" },
    { label: "Top players", path: "/top-players" },
  ];

  return (
    <Stack className="navbar" sx={{ ...styles.flexRow }} spacing={0} padding={2}>
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <img src={isLight ? logoDark : logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
      </Link>
      <input type="text" className="navbar__search button_styles" placeholder="Search..." />

      <Stack direction="row" spacing={2} sx={{ ...styles.flexRow, margin: "0 !important" }}>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} style={{ textDecoration: "none" }}>
            <Button className={`${currentPath === item.path ? "active" : ""} button_styles`}>
              {item.label}
            </Button>
          </Link>
        ))}
        <ThemeSwitchButton isLight={isLight} />
        <UserAvatar />
      </Stack>
    </Stack>
  );
};

export default Navbar;
