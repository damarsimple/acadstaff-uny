"use client";
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function BottomProfileInfo() {
    const [selectedTab, setSelectedTab] = useState("Profile");
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 4
        }}>
            <Paper sx={{
                display: "flex",
                gap: 1,
                p:2
            }}>
                {[
                    "Profile",
                    "Course & Supervision",
                    "Grant & Project",
                    "Research",
                    "Community Services",
                    "Intellectual Property/Patent",
                    "Publication"
                ].map(tab => <Button
                    onClick={
                        () => setSelectedTab(tab)
                    }
                    key={tab} variant={
                        selectedTab == tab ? "contained" : "text"
                    }>{tab}</Button>)}
            </Paper>

            {selectedTab == "Profile" && <>
            <Paper sx={{
                    p: 2
                }}>
              
                    <Typography variant="body1">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos eaque rem possimus officia porro minus, quasi id aperiam pariatur placeat repudiandae, maiores ipsa? Id nihil hic tempore sapiente, reprehenderit aperiam corporis corrupti pariatur odio atque excepturi provident, illum alias, maxime quidem! Et eaque sapiente deleniti dolor accusamus minus animi officiis culpa expedita, obcaecati suscipit optio, beatae asperiores! Amet dolor assumenda quos sequi eum sunt odio esse, dolores unde minima blanditiis voluptatibus maxime reprehenderit velit autem dolorum quis. Libero iusto, quaerat facere, mollitia nisi cumque quos quam necessitatibus suscipit accusamus totam sit distinctio modi, magni corporis? Sint ab repellendus delectus deserunt.
                    </Typography>
                </Paper>
                <Paper sx={{
                    p: 2
                }}>
                    <Typography variant="h6" color="primary">
                        AREA OF EXPERTISE (DIVISION / GROUP / FIELD)
                    </Typography>

                    <Divider />

                    <Typography variant="body1">RESEARCH INTEREST</Typography>
                </Paper>
                <Paper sx={{
                    p: 2
                }}>
                    <Typography variant="h6" color="primary">
                        RESEARCH INTEREST
                    </Typography>

                    <Divider />

                    <Typography variant="body1">
                        Energy Law ( Renewable Energy ), International Maritime Law, International Trade Law
                    </Typography>
                </Paper>
                <Paper sx={{
                    p: 2
                }}>
                    <Typography variant="h6" color="primary">
                        AREA OF EXPERTISE (DIVISION / GROUP / FIELD)
                    </Typography>

                    <Divider />

                    <Typography variant="body1">PELATIHAN TEKNIS TECHNO-ECONOMIC ASSESSMENT ENERGI BARU TERBARUKAN DALAM MENDUKUNG PERCEPATAN TRANSISI ENERGI DAN PENGEMBANGAN , Luar Universitas/eksternal (lembaga kredible) , Date : 2023-07-05 </Typography>
                </Paper>
            </>}
        </Box>
    )
}
