"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Language } from "@mui/icons-material";
import { MenuItem, Menu } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const changeLanguage = (lang: string) => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href={"/"}>
            {" "}
            <Box
              display="flex"
              sx={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
              >
                <Image
                  src="/logo UNY-White 1.png"
                  width="40"
                  height="40"
                  alt="logo-uny"
                />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      md: "0.75rem",
                      lg: "1rem",
                      xl: "1.5rem",
                    },
                  }}
                >
                  UNIVERSITAS NEGERI YOGYAKARTA
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: {
                      md: "0.75rem",
                      lg: "1rem",
                      xl: "1.5rem",
                    },
                  }}
                >
                  Academic Staff Expertise
                </Typography>
              </Box>
            </Box>
          </Link>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Language />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {[
                {
                  id: "id",
                  name: "Indonesia",
                  icon: "🇮🇩",
                },
                {
                  id: "en",
                  name: "English",
                  icon: "🇬🇧",
                },
              ].map((lang) => (
                <MenuItem key={lang.id} onClick={() => changeLanguage(lang.id)}>
                  <Typography>
                    {" "}
                    {lang.icon} {lang.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
