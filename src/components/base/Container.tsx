"use client";
import { styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  padding: "10px",
  top: "30vh",
  margin: "auto",
  left: 0,
  right: 0,
  [theme.breakpoints.up("sm")]: {
    top: "27vh",
    maxWidth: "540px",
  },
  [theme.breakpoints.up("md")]: {
    top: "28vh",
    maxWidth: "720px",
  },
  [theme.breakpoints.up("lg")]: {
    top: "30vh",
    maxWidth: "1140px",
  },
}));

export default Container;
