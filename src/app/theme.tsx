"use client";

import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0B4784",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
