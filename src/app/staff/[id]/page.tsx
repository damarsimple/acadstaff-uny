import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material'
import React from 'react'

export default function Page() {
    return (
        <Box sx={{
            position: "relative",
            minHeight:"100vh"
        }}>
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
                        <Link color="inherit" href="/search">
                            Faculty
                        </Link>

                        <Typography color="textPrimary" sx={{
                            color: "blue"
                        }}>Staff</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ mt: 2 }} />
            </Box>
            <Box sx={{
                position: "absolute",
                marginTop:"100px"
            }}>
                asd
            </Box>
        </Box>
    )
}
