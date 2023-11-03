import Image from 'next/image'
import { Box, Button, Typography, styled, alpha, InputBase, Grid } from '@mui/material'
import SearchHome from './SearchHome'
import client from '@/Client'
import { gql } from '@apollo/client'
import Link from 'next/link'

async function getFacultiesData() {

  const { data } = await client.query({
    query: gql`
    query FindManyFaculty {
        findManyFaculty {
          id
          name
        }
      }`
  })

  return data.findManyFaculty as {
    id: number;
    name: string;
  }[]

}

export default async function Home() {
  const data = await getFacultiesData();
  return (
    <Box style={{
      minWidth: "100vw",
      minHeight: "100vh",
      background: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/bg.jpeg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <Box sx={{ mt: 4 }} />
      <Image src="/logo-uny.png"
        width="180"
        height="180"
        alt="logo-uny" />

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
          }
        }} >
        ACADEMIC STAFF EXPERTISE
      </Typography>
      <Box sx={{ mt: 4 }} />
      <SearchHome />
      <Box sx={{ mt: 4 }} />

      <Button>
        Advanced Search
      </Button>
      <Box sx={{ mt: 4 }} />
      <Box sx={{
        display: "flex",
        gap: 2,
        mx: "auto",
      }}>
        {data?.map((fac) => {
          return (
            <Link href={'/search?faculty_id=' + fac.id}>
            <Button key={fac.id} variant="contained" >
              {fac.name}
            </Button>
            </Link>
      )
        })}
    </Box>

    </Box >
  )
}
