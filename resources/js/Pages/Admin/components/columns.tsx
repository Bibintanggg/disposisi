"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { router } from "@inertiajs/react"

import { MoreHorizontal, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Payment = {
    id: string
    email: string
    nip: string
    username: string
    nama_lengkap: string
    jabatan: number
    bidang_id: number
    bidang?: {
        nama_bidang: string
    }
}

const getRoleName = (jabatan: number) => {
    switch (jabatan) {
        case 1: return "ADMIN"
        case 2: return "KEPALA"
        case 3: return "STAF"
        case 4: return "VERIFIKATOR"
        default: return "STAF"
    }
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "nip",
        header: "NIP",
    },
    {
        accessorKey: "bidang.nama_bidang",
        header: "Bidang",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "nama_lengkap",
        header: "Nama Lengkap",
    },
    {
        accessorKey: "jabatan",
        header: "Jabatan",
        cell: ({ row }) => {
            const jabatan = row.getValue("jabatan") as number
            return getRoleName(jabatan)
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-red-500"
                            onClick={() => {
                                router.delete(
                                    route("admin.manage-user.destroy", payment.id),
                                    {
                                        preserveScroll: true,
                                    }
                                )
                            }}

                        >
                            <Trash2Icon />
                            Hapus Akun
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]