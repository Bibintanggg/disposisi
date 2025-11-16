import { columns, Payment } from "@/components/table/column"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default function DemoPage() {
   const [data, setData] = useState<Payment[]>([])

   useEffect(() => {
    getData().then(setData)
  })

  return (
    <div className="container mx-auto py-3">
      <DataTable columns={columns} data={data} />
    </div>
  )
}