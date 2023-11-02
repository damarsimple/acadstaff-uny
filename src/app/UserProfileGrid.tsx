import { Typography, Grid, Card, Avatar, CardContent, Box } from '@mui/material';
import React from 'react';
import CheckboxList from './FilterList';

export default function UserProfileGrid() {

    const users = [
        { name: "Abdul Basith ST., M.Si., Ph.D", faculty: "Faculty of Engineering", publication: "1 Publication", patent: "0 Patent/IP", prototype: "0 Prototype" },
        { name: "Abdul Basith ST., M.Si., Ph.D", faculty: "Faculty of Engineering", publication: "1 Publication", patent: "0 Patent/IP", prototype: "0 Prototype" },
        { name: "Abdul Basith ST., M.Si., Ph.D", faculty: "Faculty of Engineering", publication: "1 Publication", patent: "0 Patent/IP", prototype: "0 Prototype" },
        { name: "Abdul Basith ST., M.Si., Ph.D", faculty: "Faculty of Engineering", publication: "1 Publication", patent: "0 Patent/IP", prototype: "0 Prototype" },
        { name: "Abdul Basith ST., M.Si., Ph.D", faculty: "Faculty of Engineering", publication: "1 Publication", patent: "0 Patent/IP", prototype: "0 Prototype" },
        // ... Add other users here
    ];

    return (
        <Box sx={{
            backgroundColor: "white", minHeight: "200vh",
            maxWidth: "100vw",
            p: 4,
            px: 8
        }}>
            <Typography sx={{
                my: 2
            }} variant="body1">Search result found <span style={{
                fontWeight: "bold"
            }}>1212</span> data with keyword <span style={{
                fontWeight: "bold"
            }}>ova</span></Typography>
            <Grid container spacing={2}>

                <Grid item xs={8} container spacing={3}>
                    {users.map((user, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                padding: '12px',
                                // hover border blue

                                "&:hover": {
                                    border: "1px solid blue",
                                    borderRadius: "12px"
                                }


                            }}>
                                <Box sx={{
                                    textAlign: 'center',
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}>
                                    <Avatar alt={user.name} src="/path/to/image.jpg" style={{ width: '80px', height: '80px', margin: '0 auto' }} />
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        alignItems: 'center',
                                    }}>
                                        <Typography variant="body1"
                                            sx={{
                                                fontWeight: "bold"
                                            }}
                                        >{user.name}</Typography>
                                        <Typography variant="caption">{user.faculty}</Typography>

                                    </CardContent>
                                </Box>
                                <Grid container spacing={1} sx={{
                                    // items center

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">{user.publication}</Typography>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">{user.patent}</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography variant="body2">{user.prototype}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid xs={4} item >
                    <CheckboxList />
                </Grid>
            </Grid>
        </Box>
    );
}
