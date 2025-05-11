import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContex";
import { muiTheme } from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"; // MUI theme provider
import CssBaseline from "@mui/material/CssBaseline"; // Reset CSS

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
