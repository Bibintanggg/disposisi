import { columns, Payment } from "@/Pages/Admin/components/columns"
import { DataTable } from "@/Pages/Admin/components/data-table"
import { usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { useEffect, useState } from "react"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      email: "bintangyuda08@gmail.com",
      nip: '1029301312',
      username: "Admin IF'26",
      nama_lengkap: "Bintang Yudha Putra Purnomo",
      jabatan: 2,
      bidang_id: 10
    },
    // ...
  ]
}

interface ManageUserProps {
  users: Payment[]
}

export default function Table() {
  const [data, setData] = useState<Payment[]>([])

  useEffect(() => {
    getData().then(setData)
  }, [])

  const { users } = usePage<InertiaPageProps & ManageUserProps>().props;

  return (
    <div className="container mx-auto py-3">
      <DataTable columns={columns} data={users} />
    </div>
  )
}