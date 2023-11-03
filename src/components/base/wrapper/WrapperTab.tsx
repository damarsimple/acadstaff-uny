"use client";
import { styled } from "@mui/material";

const WrapperTab = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  color: "rgba(0, 0, 0, 0.87)",
  borderRadius: "4px",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  padding: "16px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 100px)",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export default WrapperTab;
