import { format, parseISO } from "date-fns"
import { getRawMaterialData } from "@/actions/raw-material-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function RawClient() {
  const data = await getRawMaterialData()
  const formattedData = data.data.map((item) => ({
    id: item.id,
    materialName: item.attributes?.materialName,
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Raw-Material (${data.meta?.pagination?.total})`}
          description="Manage Raw Materials for your products"
        />
        <ModalBtn />
      </div>
      <Separator />
      <DataTable
        searchKey="materialName"
        columns={columns}
        data={formattedData}
      />
    </>
  )
}
