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
import { Metadata, ResolvingMetadata } from "next";
import { useParams } from "next/navigation";
import React from "react";
import QRCode from "react-qr-code";


type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  const staff = await getStaffData(params.id);
 
  return {
    title:  `${staff.name} | ${staff.faculty.name} | Universitas Negeri Yogyakarta`,
    description: staff.description ?? "Discover the dedicated faculty of Universitas Negeri Yogyakarta. Explore profiles, research interests, academic achievements, and ways to connect with our academic staff.",
    keywords : "Universitas Negeri Yogyakarta Faculty, Academic Staff Profiles, Faculty Research Interests, Academic Publications, Educational Expertise, Faculty Contact Information, Research and Scholarly Work, Academic Certifications and Courses",
    robots: "index, follow",

    openGraph: {
      images: [staff.profile_image_url],
      type: "profile",
    },
  
  }
}
 
async function getStaffData(email: string) {
  "use server";
  try {

    const { data } = await client.query({
      query: gql`
      query FindUniqueAcademicStaff($where: AcademicStaffWhereUniqueInput!) {
        findUniqueAcademicStaff(where: $where) {
          id
          name
          photo
          description
          physical_address
          expertise
          position
          educations
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
  fetchPolicy: "no-cache",
      variables: {
        where: {
          email: decodeURIComponent(email),
        },
      },
    });
    return data.findUniqueAcademicStaff;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
            height: {
              sm: 200,
              xs: 420,
            },
            p: 2,
            display: "flex",
            // justifyContent: "center",
            alignItems: {
              xs: "center",
              small: "normal"
            },
            flexDirection: {
              sm: "row",
              xs: "column"
            },
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
              width: {
                xs: "100%",
                sm: "70%",
              }
            }}
          >
            <Typography variant="h6" component="h1">{staff.name}</Typography>
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
              display: {
                xs: "none",
                sm: "flex",
              },
              flexDirection: "column",
              gap: 2,
              width: "30%",
              alignItems: "center",

            }}
          >

            <QRCode
              size={256}
              style={{ height: 100, maxWidth: "100%", width: "100%" }}
              value={"123"}
              viewBox={`0 0 256 256`}
            />

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

          <Box
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
              flexDirection: "column",
              gap: 2,
              width: "100%",
              alignItems: "center",
            }}
          >
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
        <BottomProfileInfo
          staff={staff}
        />
      </Container>
    </Box>
  );
}
