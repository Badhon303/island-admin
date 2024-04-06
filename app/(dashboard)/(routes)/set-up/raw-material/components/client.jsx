import { format, parseISO } from "date-fns"
import { getRawMaterialData } from "@/actions/raw-material-actions"

import AddNewBtn from "@/components/ui/add-new-btn"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

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
        {/* <Button onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
        <AddNewBtn />
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
