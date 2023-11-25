"use client";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

enum Tab {
  Profile = "Profile",
  CourseAndSupervision = "Course & Supervision",
  GrantAndProject = "Grant & Project",
  Research = "Research",
  CommunityServices = "Community Services",
  IntellectualProperty = "Intellectual Property/Patent",
  Publication = "Publication",
}
const tabs = [
  "Profile",
  "Course & Supervision",
  "Grant & Project",
  "Research",
  "Community Services",
  "Intellectual Property/Patent",
  "Publication",
] as Tab[];


export default function BottomProfileInfo({staff} : {staff: any}) {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Profile);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          overflow: "scroll",

        }}
      >
        {tabs.map((tab) => (
          <Button
            onClick={() => setSelectedTab(tab)}
            key={tab}
            variant={selectedTab == tab ? "contained" : "text"}
            sx={{
              minWidth: 200
            }}
            size="small"
          >
            {tab}
          </Button>
        ))}
      </Paper>

      {selectedTab == Tab.Profile && (
        <>
          <Paper
            sx={{
              p: 2,
            }}
          >
            <Typography variant="body1">
              {staff?.description ?? "No description"}
            </Typography>
          </Paper>

          <SectionData
            title="AREA OF EXPERTISE (DIVISION / GROUP / FIELD)"
            data={staff?.expertise?.split(",") ?? ["No expertise listed"]}
          />
           <SectionData
            title="EDUCATION BACKGROUND"
            data={staff?.educations ?? ["No education listed"]}
          />
          <SectionData
            title="RESEARCH INTEREST"
            data={[
              "Energy Law ( Renewable Energy ), International Maritime Law, International Trade Law"
            ]}
          />
        </>
      )}

      {selectedTab == Tab.CourseAndSupervision && (
        <>

          <SectionData
            title="Course"
            data={[
              "3 SKS - Hukum Energi Terbarukan (S1) - 2021/2022 - Semester Ganjil",
              "3 SKS - Hukum Energi Terbarukan (S1) - 2020/2021 - Semester Ganjil",
            ]}
          />

          <SectionData
            title="Supervision"
            data={[
              "2020/2021 - Semester Ganjil - 1 Mahasiswa",
              "2021/2022 - Semester Ganjil - 1 Mahasiswa",
            ]}
          />

        </>
      )}

      {selectedTab == Tab.GrantAndProject && (
        <>

          <SectionData
            title="Grant"
            data={[
              "Peer Assessment of Research Proposal for Research Grant, Universitas Gadjah Mada, 2021",

            ]}
          />

          <SectionData
            title="Project"
            data={[
              "Pengembangan Sistem Informasi Pelayanan Hukum Berbasis Teknologi Informasi dan Komunikasi (Tik) di Lingkungan Universitas Gadjah Mada, Universitas Gadjah Mada, 2021",
              "Collaborative Research on the Development of a Legal Framework for the Implementation of the ASEAN Single Window (ASW) in Indonesia, Universitas Gadjah Mada, 2021",
            ]}
          />

        </>
      )}
      {selectedTab == Tab.Research && (
        <>

          <SectionData
            title="Research"
            data={[
              "Data Protection in the Digital Era: A Comparative Study of Indonesia and the European Union, Universitas Gadjah Mada, 2021",
              "Dampak Hukum Penggunaan Teknologi Blockchain dalam Transaksi Bisnis, Universitas Gadjah Mada, 2021",

            ]}
          />


        </>
      )}
      {selectedTab == Tab.CommunityServices && (
        <>

          <SectionData
            title="Research"
            data={[
              "Community Service on the Development of a Legal Framework for the Implementation of the ASEAN Single Window (ASW) in Indonesia, Universitas Gadjah Mada, 2021",
              "Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) UGM, Universitas Gadjah Mada, 2021",

            ]}
          />


        </>
      )}

      {selectedTab == Tab.IntellectualProperty && (
        <>

          <SectionData
            title="Research"
            data={[

              "Hak Kekayaan Intelektual dalam Transaksi Bisnis, Universitas Gadjah Mada, 2021",

            ]}
          />


        </>
      )}
      {selectedTab == Tab.Publication && (
        <>

          <SectionData
            title="Publication"
            data={[

              "Jurnal Ilmiah Nasional Terakreditasi Peringkat 2, Universitas Gadjah Mada, 2021",


            ]}
          />


        </>
      )}
    </Box>
  );
}


interface SectionDataProps {
  title: string;
  data: string[];
}

export const SectionData = ({ title,
  data }: SectionDataProps) => {
  return <Paper
    sx={{
      p: 2,
      display: "flex",
      gap: 2,
      flexDirection: "column"
    }}
  >
    <Typography variant="h6" color="primary" textTransform={"uppercase"}>
      {title}
    </Typography>

    <Divider />

    {
      data.map((d, i) => <Typography key={i} variant="body1">
        {d}
      </Typography>)
    }
  </Paper>
}