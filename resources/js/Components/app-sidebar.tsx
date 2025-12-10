"use client"

import * as React from "react"
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutGrid,
  Map,
  Monitor,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import { TeamSwitcher } from "./team-switcher"

const USER_JABATAN = {
  ADMIN: 1,
  KEPALA: 2,
  STAF: 3,
  VERIFIKATOR: 4
}


const navTeam = {
  teams: [
    {
      name: "SIDISPOSISI",
      logo: GalleryVerticalEnd,
      plan: "Pengelola Surat",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { props: page } = usePage()
  const { auth } = page
  const userRole = auth.user.jabatan

  function MainNavItem() {
    if (userRole === USER_JABATAN.ADMIN) {
      return [
        {
          title: 'Dashboard', url: '/admin/dashboard', icon: LayoutGrid
        },
        {
          title: 'Manajemen Pengguna', url: '/admin/manage-user', icon: Book, items:
            [
              { title: "Kelola Pengguna", url: "/admin/manage-user" },
              { title: "Master Data Bidang", url: "/admin/master-data" },
            ]
        },
        { title: 'Arsip Global', url: '/admin/arsip-global', icon: Calendar },
      ]
    } else if (userRole === USER_JABATAN.STAF) {
      return [
        { title: 'Dashboard', url: '/staf/dashboard', icon: LayoutGrid },
        {
          title: 'Tugas Saya', url: '/staf/tugas-saya', icon: Book, items:
            [
              { title: "Tugas Masuk (Inbox)", url: "/staf/tugas-masuk" },
              { title: "Tugas Sedang Diproses", url: "/staf/tugas-sedang-diproses" },
            ]
        },
        { title: 'Laporan Tindak Lanjut', url: '/staf/laporan-tindak', icon: Calendar },
        { title: 'Riwayat Tugas Selesai', url: '/staf/riwayat-tugas', icon: Monitor },
      ]
    } else if (userRole === USER_JABATAN.KEPALA) {
      return [
        { title: 'Dashboard', url: '/kepala/dashboard', icon: LayoutGrid },
        {
          title: 'Disposisi', url: '/kepala/disposisi', icon: Book, items:
            [
              { title: "Surat Menunggu Disposisi", url: "/kepala/surat-menunggu" },
              { title: "Lacak Disposisi Terkirim", url: "/kepala/lacak-disposisi" },
            ]
        },
        { title: 'Arsip Surat Masuk', url: '/kepala/arsip-surat', icon: Calendar },
        { title: 'Laporan Kinerja Staf', url: '/kepala/laporan-kinerja', icon: Monitor },
      ]
    } else if (userRole === USER_JABATAN.VERIFIKATOR) {
      return [
        { title: 'Dashboard', url: '/verif/dashboard', icon: LayoutGrid },
        {
          title: 'Surat Masuk', url: '/verif/surat-masuk', icon: Book, items:
            [
              { title: "Input Surat Masuk", url: "/verif/input-surat-masuk" },
              { title: "Daftar Surat Masuk", url: "/verif/daftar-surat-masuk" },
            ]
        },
        {
          title: 'Surat Keluar', url: '/verif/surat-masuk', icon: Book, items:
            [
              { title: "Input Surat Keluar", url: "/verif/input-surat-keluar" },
              { title: "Daftar Surat Keluar", url: "/verif/daftar-surat-keluar" },
            ]
        },
        { title: 'Cetak & Verifikasi', url: '/verif/cetak-verifikasi', icon: Monitor },
      ]
    }
    return []
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <TeamSwitcher teams={navTeam.teams} />
        <NavMain items={MainNavItem()} />
        {/* <NavProjects projects={MainNavItem}/> */}
      </SidebarContent>
      <SidebarFooter>
        {auth.user ? (
          <NavUser user={{
            nama_lengkap: auth.user.nama_lengkap,
            email: auth.user.email
          }} />
        ) : (
          <p>Login Ulang</p>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
