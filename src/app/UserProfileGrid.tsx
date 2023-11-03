"use client";

import { Typography, Grid, Card, Avatar, CardContent, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckboxList from './FilterList';
import SearchProfile from '@/SearchProfile';
import client from '@/Client';
import useFilterStore from '@/stores/filter';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useParams, useSearchParams } from 'next/navigation';

export default function UserProfileGrid() {
    const params = useSearchParams();


    const [staffs, setStaffs] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const { selected, search, setSearch, setSelected } = useFilterStore();


    useEffect(() => {
        client.query({
            query: gql`query FindManyAcademicStaff($take:Int, $skip:Int, $where: AcademicStaffWhereInput) {
                findManyAcademicStaffCount(where: $where)
                findManyAcademicStaff(take:$take, skip:$skip, where: $where) {
                  id
                  _count {
                    certifications
                    courses
                    educations
                    researchInterests
                    researchClusters
                    researches
                    scholarships
                  }
                  unit
                  part
                  name
                  profile_image_url
                  email
                  faculty{
                    id
                    name
                  }
                }
              }`,
            variables: {
                "take": 20,
                "skip": 0,
                "where": {
                    "name": search.length != 0 ? {
                        "contains": search
                    } : params.get('name') ? {
                        "contains": params.get('name')!
                    } : undefined,


                    "faculty_id": selected.length != 0 ? {
                        "in": selected
                    } : params.get('faculty_id') ? {
                        "in": [Number(params.get('faculty_id')!)],
                    } : undefined


                }
            }
        }).then(({ data }) => {
            setStaffs(data.findManyAcademicStaff)
            setCount(data.findManyAcademicStaffCount)
        })
    }, [selected, search])



    return (
        <Box sx={{
            backgroundColor: "white", minHeight: "200vh",
            maxWidth: "100vw",
            p: 4,
            px: 8
        }}>


            <SearchProfile />
            <Typography sx={{
                my: 2
            }} variant="body1">Search result found <span style={{
                fontWeight: "bold"
            }}>{count}</span> data with keyword <span style={{
                fontWeight: "bold"
            }}>{search}</span></Typography>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Grid container spacing={1}>
                        {staffs.map((user, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    onClick={() => {
                                        window.location.replace("/staff/" + user.email)
                                    }}
                                    sx={{
                                        padding: '12px',
                                        // hover border blue
                                        "&:hover": {
                                            border: "1px solid blue",
                                            borderRadius: "12px"
                                        },

                                        cursor: "pointer"


                                    }}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                    }}>
                                        <Avatar alt={user.name} src={user.profile_image_url ?? "/bg.jpeg"} style={{ width: '80px', height: '80px', margin: '0 auto' }} />
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
                                            <Typography variant="caption">{user.faculty.name}</Typography>

                                        </CardContent>
                                    </Box>
                                    <Grid container spacing={1} sx={{
                                        // items center

                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">{user._count.researches} Penelitian</Typography>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">{user._count.courses} Course</Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="body2">{user._count.certifications} Sertifikasi</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid xs={4} item >
                    <CheckboxList />
                </Grid>
            </Grid>
        </Box>
    );
}
