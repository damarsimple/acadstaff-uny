"use client";

import {
  Typography,
  Grid,
  Card,
  Avatar,
  CardContent,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckboxList from "./FilterList";
import ExpertiseList from "./ExpertiseList";
import SearchProfile from "@/SearchProfile";
import client from "@/Client";
import useFilterStore from "@/stores/filter";
import { gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";

interface StaffData {
  fu_nama: string;
  ba_nama: string | null;
  detasering: string | null;
  fu_ak: string;
  go_nama: string;
  go_pangkat: string;
  gr_nama: string;
  haki: any;
  pe_nama: string;
  penelitian: any;
  pengabdian: any;
  publikasi: any;
  un_nama: string;
  un_ket: string;
  sta_nama: string;
  st_nama: string;
  se_nama: string;
  se_ket: string;
  sdmk_emailuny: string;
  sdm_tgllahir: string;
  sdm_tmplahir: string;
  sdm_nama: string;
  sdm_id: string;
  sdm_foto_file: string;
  sb_nama: string | null;
  rwykep_sta_id: string;
  rwykep_st_id: string;
  rwype_sb_nama: string;
  rwype_se_ket: string;
  rwyuk_sb_id: string | null;
  rwyuk_ba_id: string | null;
  rwyuk_se_id: string;
  rwyuk_un_id: string;
  rwykep_gr_id: string;
  rwykep_nip: string;
}

export default function UserProfileGrid() {
  const params = useSearchParams();

  const [staffs, setStaffs] = useState<StaffData[]>([]);
  const [count, setCount] = useState(0);
  const { selected, search, setSearch, setSelected } = useFilterStore();

  useEffect(() => {
    client
      .query<{ staffs: StaffData[] }>({
        query: gql`
          query Staffs {
            staffs {
              fu_nama
              ba_nama
              detasering {
                total_document
              }
              fu_ak
              go_nama
              go_pangkat
              gr_nama
              haki {
                total_document
              }
              pe_nama
              penelitian {
                total_document
              }
              pengabdian {
                total_document
              }
              publikasi {
                total_document
              }
              un_nama
              un_ket
              sta_nama
              st_nama
              se_nama
              se_ket
              sdmk_emailuny
              sdm_tgllahir
              sdm_tmplahir
              sdm_nama
              sdm_id
              sdm_foto_file
              sb_nama
              rwykep_sta_id
              rwykep_st_id
              rwype_sb_nama
              rwype_se_ket
              rwyuk_sb_id
              rwyuk_ba_id
              rwyuk_se_id
              rwyuk_un_id
              rwykep_gr_id
              rwykep_nip
            }
          }
        `,

        variables: {
          take: 21,
          skip: 0,
          where: {
            name:
              search.length != 0
                ? {
                    contains: search,
                  }
                : params.get("name")
                ? {
                    contains: params.get("name")!,
                  }
                : undefined,

            faculty_id:
              selected.length != 0
                ? {
                    in: selected,
                  }
                : params.get("faculty_id")
                ? {
                    in: [Number(params.get("faculty_id")!)],
                  }
                : undefined,
          },
        },
      })
      .then(({ data }) => {
        setStaffs(data.staffs);
        // setCount(data.findManyAcademicStaffCount)
        setCount(1);
      });
  }, [selected, search]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "200vh",
        maxWidth: "100vw",
        p: 4,
        px: 8,
      }}
    >
      <SearchProfile />
      <Typography
        sx={{
          my: 2,
        }}
        variant="body1"
      >
        Search result found{" "}
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          {count}
        </span>{" "}
        data with keyword{" "}
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          {search}
        </span>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            {staffs.map((user, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Link href={"/staff/" + user.sdm_id}>
                  <Card
                    sx={{
                      padding: "12px",
                      // hover border blue
                      "&:hover": {
                        border: "1px solid blue",
                        borderRadius: "12px",
                      },

                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        alt={user.sdm_nama}
                        src={user.sdm_foto_file ?? "/bg.jpeg"}
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                        }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          {user.sdm_nama}
                        </Typography>
                        <Typography variant="caption">
                          {user.un_ket}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        // items center

                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {user.penelitian.total_document} Penelitian
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {user.publikasi.total_document} Publikasi
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {user.haki.total_document} Haki
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <ExpertiseList />
          <Box mt={2} />
          <CheckboxList />
        </Grid>
      </Grid>
    </Box>
  );
}
