"use client";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Staff } from "./app/staff/[id]/page";
import get from "lodash/get";
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
  // "Course & Supervision",
  // "Grant & Project",
  "Research",
  "Community Services",
  "Intellectual Property/Patent",
  "Publication",
] as Tab[];

const maps = {
  copyrights: {
    title: "judul",
    subtitle: "tanggal",
    extra: "nama_jurnal",
  },

  communityServices: {
    title: "judul",
    subtitle: "tahun_usulan",
    extra: "afiliasi",
  },

  publications: {
    title: "judul",
    subtitle: "tanggal",
    extra: "penerbit",
  },

  researches: {
    title: "judul",
    subtitle: "tahun_usulan",
    extra: "afiliasi",
  },
};

interface Structure {
  title: string;
  subtitle: string;
  extra?: string;
}

interface StructuredData {
  copyrights: Structure[];
  communityServices: Structure[]; // Specify the type if the structure is known
  publications: Structure[]; // Specify the type if the structure is known
  researches: Structure[]; //
}

const extractor = (e: any, keyA: any) => {
  let obj = {} as any;
  // @ts-ignores
  for (const key in maps[keyA]) {
    // @ts-ignore
    obj[key] = get(e, maps[keyA][key]);
  }

  return obj;
};
export function mapper(staff: Staff): StructuredData {
  const copyrights = staff.copyrights.map((e) => extractor(e, "copyrights")).reverse()
  const communityServices = staff.communityServices.map((e) =>
    extractor(e, "communityServices")
  ).reverse();
  const publications = staff.publications.map((e) =>
    extractor(e, "publications")
  ).reverse();
  const researches = staff.researches.map((e) => extractor(e, "researches")).reverse();

  return {
    copyrights,
    communityServices,
    publications,
    researches,
  };
}

export default function BottomProfileInfo({ staff }: { staff: Staff }) {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Profile);
  const mapped = mapper(staff);
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
              minWidth: 200,
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
              {/* {staff?.description ?? "No description"} */}
            </Typography>
          </Paper>

          {[
            {
              title: "Educational Background",
              subtitle: staff.data.rwype_se_ket,
              extra: staff.data.rwype_sb_nama,
            },
            {
              title: "Current Position and Employment Status",
              subtitle: staff.data.gr_nama,
              extra: `Rank: ${staff.data.go_nama}, ${staff.data.go_pangkat}`,
            },
            {
              title: "Academic and Professional Achievements",
              subtitle: "HAKI, Publications",
              extra: `HAKI: ${staff.data.haki.total_document} documents, Publications: ${staff.data.publikasi.total_document} documents`,
            },
            {
              title: "Institutional Affiliation",
              subtitle: staff.data.un_nama,
              extra: `Faculty: ${staff.data.un_ket}`,
            },
            {
              title: "Identification Details",
              subtitle: "NIP, University ID",
              extra: `NIP: ${staff.data.rwykep_nip}`,
            },
          ].map((e) => (
            <SectionData
              title={e.title}
              data={[
                {
                  title: e.extra,
                  subtitle: e.subtitle,
                },
              ]}
            />
          ))}
          {/* <SectionData
            title="AREA OF EXPERTISE (DIVISION / GROUP / FIELD)"
            data={staff?.expertise?.split(",") ?? ["No expertise listed"]}
          /> */}
          {/* <SectionData
            title="EDUCATION BACKGROUND"
            data={staff?.educations ?? ["No education listed"]}
          /> */}
          {/* <SectionData
            title="RESEARCH INTEREST"
            data={[
              "Energy Law ( Renewable Energy ), International Maritime Law, International Trade Law",
            ]}
          /> */}
        </>
      )}

      {selectedTab == Tab.CourseAndSupervision && (
        <>
          {/* <SectionData
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
          /> */}
        </>
      )}

      {selectedTab == Tab.Research && (
        <>
          <SectionData title="Research" data={mapped.researches} />
        </>
      )}
      {selectedTab == Tab.CommunityServices && (
        <>
          <SectionData
            title="Community Services"
            data={mapped.communityServices}
          />
        </>
      )}

      {selectedTab == Tab.IntellectualProperty && (
        <>
          <SectionData title="Research" data={mapped.copyrights} />
        </>
      )}
      {selectedTab == Tab.Publication && (
        <>
          <SectionData title="Publication" data={mapped.publications} />
        </>
      )}
    </Box>
  );
}

interface SectionDataProps {
  title: string;
  data: Structure[];
}

export const SectionData = ({ title, data }: SectionDataProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="primary" textTransform={"uppercase"}>
        {title}
      </Typography>

      <Divider />

      {data.map((d, i) => (
        <Box key={i} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1">{d.title}</Typography>
            <Typography variant="caption">{d.subtitle}</Typography>
          </Box>

          {d.extra && (
            <>
              <Divider />

              <Typography variant="caption">{d.extra}</Typography>
            </>
          )}
        </Box>
      ))}
    </Paper>
  );
};
