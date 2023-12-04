import Image from "next/image";
import {
  Box,
  // Button,
  Typography,
  styled,
  alpha,
  InputBase,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";

import SearchHome from "./SearchHome";
import client from "@/Client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { Metadata } from "next";
import { faculties } from "@/type";

export const metadata: Metadata = {
  title:
    "Universitas Negeri Yogyakarta Staff - Discover Top Academic Talent & Research",
  description:
    "Explore the distinguished staff of Universitas Negeri Yogyakarta. Connect with leading lecturers, delve into groundbreaking research, and access a wealth of scholarly publications.",
  openGraph: {
    title: "Universitas Negeri Yogyakarta Staff | A Hub of Academic Excellence",
    description:
      "Connect with the brightest minds at UNY. Explore our innovative research, read our latest publications, and discover opportunities to advance your career.",
    type: "website",
    images: ["https://uny.ac.id/sites/default/files/logo%20web%20indo.png"],
    siteName: "Universitas Negeri Yogyakarta",
  },
};

async function getFacultiesData() {
  return faculties;
}

export default async function Home() {
  const data = await getFacultiesData();
  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 10,
      }}
    >
      <Box sx={{ mt: 4 }} />
      <Image
        src="/logo UNY-White 1.png"
        width="180"
        height="180"
        alt="logo-uny"
      />

      <Typography
        color={"white"}
        component="div"
        sx={{
          mt: 2,
          fontWeight: "bold",
          fontSize: {
            md: "1.5rem",
            lg: "1.75rem",
            xl: "2rem",
          },
        }}
      >
        ACADEMIC STAFF EXPERTISE
      </Typography>
      <Box sx={{ mt: 4 }} />
      <SearchHome />
      <Box sx={{ mt: 4 }} />

      <Button>Advanced Search</Button>
      <Box sx={{ mt: 4 }} />
      <Box sx={{}}>
        <Box
          sx={{
            p: 4,
          }}
        >
          {data?.map((fac) => {
            return (
              <Link key={fac.id} href={"/search?faculty_id=" + fac.id}>
                <Button sx={{ m: 1, color: "white" }} variant="outlined">
                  {fac.name}
                </Button>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
