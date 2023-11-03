import BottomProfileInfo from "@/BottomProfileInfo";
import client from "@/Client";
import Container from "@/components/base/Container";
import { gql } from "@apollo/client";
import {
  Email,
  EmailSharp,
  Facebook,
  Instagram,
  LinkOutlined,
  LinkedIn,
  LocalPostOffice,
  Place,
  YouTube,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

async function getStaffData(email: string) {
  "use server";

  const { data } = await client.query({
    query: gql`
      query FindUniqueAcademicStaff($where: AcademicStaffWhereUniqueInput!) {
        findUniqueAcademicStaff(where: $where) {
          id
          name
          photo
          physical_address
          position
          profile_image_url
          status
          unit
          website
          researchClusters {
            id
            name
            description
          }
          researchInterests {
            name
            id
          }
          researches {
            id
            role
          }
          scholarships {
            link_url
            id
            name
            description
          }
          group
          faculty {
            id
            name
          }
          externalKey
          expertise
          email
          dob
          description
          educations {
            id
            name
          }
          courses {
            id
            name
          }
          contactMethods {
            id
            link_url
            type
          }
          certifications {
            id
            name
            description
          }
        }
      }
    `,

    variables: {
      where: {
        email: decodeURIComponent(email),
      },
    },
  });
  return data.findUniqueAcademicStaff;
}

export default async function Page({ params }: any) {
  const staff = await getStaffData(params.id);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "800vh",
        flexGrow: 1,
      }}
    >
      <Box
        style={{
          minWidth: "100vw",
          minHeight: "40vh",
          background:
            "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/bg.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            ml: 3,
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: "white",
              marginBottom: 2,
            }}
          >
            <Link color="inherit" href="/">
              Home
            </Link>
            <Link color="inherit" href="/search">
              Faculty
            </Link>

            <Typography
              color="textPrimary"
              sx={{
                color: "blue",
              }}
            >
              Staff
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ mt: 2 }} />
      </Box>
      <Container>
        <Paper
          sx={{
            height: 200,
            p: 2,
            display: "flex",
            gap: 2,
          }}
        >
          <Avatar
            src={staff.profile_image_url ?? "/bg.jpeg"}
            sx={{
              width: 160,
              height: 160,
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
            }}
          >
            <Typography variant="h6">{staff.name}</Typography>
            <Typography variant="caption">
              {staff.group}/{staff.expertise}
            </Typography>
            <Box mt={2} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocalPostOffice />
              <Typography>{staff.faculty.name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Place />
              <Typography>{staff.pyshical_address}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LinkOutlined />
              <Typography>www.com</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EmailSharp />
              <Typography>{staff.email}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "30%",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">REACH US OUT!</Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Facebook />
              <Instagram />
              <YouTube />
              <LinkedIn />
            </Box>
          </Box>
        </Paper>
        <Box mt={4} />
        <BottomProfileInfo />
      </Container>
    </Box>
  );
}
