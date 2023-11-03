"use client";
import { styled } from "@mui/material";

const WrapperAvatar = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "10px",
  top: "-10vh",
  right: 0,
  left: 0,
  [theme.breakpoints.up("md")]: {
    position: "relative",
    top: 0,
    width: "inherit",
  },
}));

export default WrapperAvatar;
