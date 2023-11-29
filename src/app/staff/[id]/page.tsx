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
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const staff = await getStaffData(params.id);

  return {
    title: `${staff.data.sdm_nama} | ${staff.data.fu_nama} | Universitas Negeri Yogyakarta`,
    description:
      // staff.description ??
      "Discover the dedicated faculty of Universitas Negeri Yogyakarta. Explore profiles, research interests, academic achievements, and ways to connect with our academic staff.",
    keywords:
      "Universitas Negeri Yogyakarta Faculty, Academic Staff Profiles, Faculty Research Interests, Academic Publications, Educational Expertise, Faculty Contact Information, Research and Scholarly Work, Academic Certifications and Courses",
    robots: "index, follow",

    openGraph: {
      images: [staff.data.sdm_foto_file],
      type: "profile",
    },
  };
}

interface Detasering {
  total_document: number;
}

interface Haki {
  total_document: number;
}

interface Penelitian {
  total_document: number;
}

interface Pengabdian {
  total_document: number;
}

interface Publikasi {
  total_document: number;
}

interface Copyright {
  edisi: string;
  halaman: string;
  asal_data: string;
  doi: string;
  e_issn: string;
  isbn: string;
  issn: string;
  jenis_publikasi: string;
  judul: string;
  judul_artikel: string | null;
  jumlah_halaman: string;
  judul_asli: string | null;
  kategori_capaian_luaran: string;
  keterangan: string;
  kategori_kegiatan: string;
  nama_jurnal: string;
  nomor_paten: string;
  nomor: string;
  pemberi_paten: string;
  penerbit: string;
  prosiding: string;
  seminar: string;
  tanggal: string;
  tautan: string | null;
  volume: string;
}

interface StaffData {
  fu_nama: string;
  ba_nama: string;
  detasering: Detasering;
  fu_ak: string;
  go_nama: string;
  go_pangkat: string;
  gr_nama: string;
  haki: Haki;
  pe_nama: string;
  penelitian: Penelitian;
  pengabdian: Pengabdian;
  rwykep_gr_id: string;
  publikasi: Publikasi;
  rwykep_nip: string;
  rwykep_st_id: string;
  rwykep_sta_id: string;
  rwype_sb_nama: string;
  rwyuk_ba_id: string;
  rwype_se_ket: string;
  rwyuk_sb_id: string | null;
  rwyuk_se_id: string;
  rwyuk_un_id: string;
  sb_nama: string | null;
  sdm_foto_file: string;
  sdm_id: string;
  sdm_nama: string;
  sdm_tgllahir: string;
  sdm_tmplahir: string;
  sdmk_emailuny: string;
  se_ket: string;
  sta_nama: string;
  st_nama: string;
  se_nama: string;
  un_ket: string;
  un_nama: string;
}

export interface Staff {
  data: StaffData;
  copyrights: Copyright[];
  communityServices: any[]; // Specify the type if the structure is known
  publications: any[]; // Specify the type if the structure is known
  researches: any[]; // Specify the type if the structure is known
}

interface RootObject {
    staff: Staff;
}

async function getStaffData(email: string) {
  "use server";
  try {
    const { data } = await client.query<RootObject>({
      query: gql`
        query Staffs($staffId: String) {
          staff(id: $staffId) {
            data {
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
              rwykep_gr_id
              publikasi {
                total_document
              }
              rwykep_nip
              rwykep_st_id
              rwykep_sta_id
              rwype_sb_nama
              rwyuk_ba_id
              rwype_se_ket
              rwyuk_sb_id
              rwyuk_se_id
              rwyuk_un_id
              sb_nama
              sdm_foto_file
              sdm_id
              sdm_nama
              sdm_tgllahir
              sdm_tmplahir
              sdmk_emailuny
              se_ket
              sta_nama
              st_nama
              se_nama
              un_ket
              un_nama
            }
            copyrights {
              edisi
              halaman
              doi
              e_issn
              isbn
              issn
              jenis_publikasi
              judul
              judul_artikel
              jumlah_halaman
              judul_asli
              kategori_capaian_luaran
              keterangan
              kategori_kegiatan
              nama_jurnal
              nomor_paten
              nomor
              pemberi_paten
              penerbit
              prosiding
              seminar
              tanggal
              tautan
              volume
            }
            communityServices {
              afiliasi
              jenis_skim
              judul
              kelompok_bidang
              lokasi
              sispeng_insert_at
              sispeng_update_at
              sk_penugasan
              tahun_kegiatan
              tahun_pelaksanaan
              tahun_pelaksanaan_ke
              tahun_usulan
              tanggal_sk_penugasan
            }
            publications {
              e_issn
              doi
              asal_data
              edisi
              halaman
              isbn
              issn
              jenis_publikasi
              judul
              judul_artikel
              judul_asli
              jumlah_halaman
              kategori_capaian_luaran
              kategori_kegiatan
              keterangan
              nama_jurnal
              nomor
              nomor_paten
              pemberi_paten
              penerbit
              prosiding
              seminar
              tanggal
              volume
              tautan
            }
            researches {
              lokasi
              judul
              afiliasi
              jenis_skim
              kelompok_bidang
              sispen_insert_at
              sispen_update_at
              sk_penugasan
              tahun_kegiatan
              tahun_pelaksanaan
              tahun_pelaksanaan_ke
              tahun_usulan
              tanggal_sk_penugasan
            }
          }
        }
      `,
      fetchPolicy: "no-cache",
      variables: {
          staffId: decodeURIComponent(email),
      },
    })
    return data.staff;
  } catch (error) {
    //@ts-ignore
    console.error(error);
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
              small: "normal",
            },
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            gap: 2,
          }}
        >
          <Avatar
            src={staff.data.sdm_foto_file ?? "/bg.jpeg"}
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
              },
            }}
          >
            <Typography variant="h6" component="h1">
              {staff.data.sdm_nama}
            </Typography>
            <Typography variant="caption">
              {staff.data.un_ket}
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
              <Typography>{staff.data.un_ket}</Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Place />
              <Typography>Address</Typography>
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
            </Box> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EmailSharp />
              <Typography>{staff.data.sdmk_emailuny}</Typography>
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
        <BottomProfileInfo staff={staff} />
      </Container>
    </Box>
  );
}
