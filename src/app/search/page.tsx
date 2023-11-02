import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material'
import React from 'react'
import UserProfileGrid from '../UserProfileGrid'

export default function Page() {
    return (
        <Box>
            <Box style={{
                minWidth: "100vw",
                minHeight: "40vh",
                background: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/bg.jpeg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Box sx={{ mt: 10 }} />
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                    ml: 3
                }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{
                        color: "white",
                        marginBottom: 2
                    }}>
                        <Link color="inherit" href="/">
                            Home
                        </Link>

                        <Typography color="textPrimary" sx={{
                            color: "blue"
                        }}>Search Page</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ mt: 2 }} />

                <Typography
                    color={"white"}
                    component="div"
                    variant='h4'
                    fontWeight={"bold"}
                >
                    List of Experts
                </Typography>
                <Typography
                    color={"white"}
                    component="div"
                    variant='caption'

                >
                    Dosen kami yang memiliki banyak keahlian
                </Typography>
                <Box sx={{ mt: 4 }} />


            </Box>

            <UserProfileGrid />
        </Box>
    )
}
