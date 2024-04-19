import { format, parseISO } from "date-fns"
import { getRawMaterialData } from "@/actions/raw-material-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function RawClient() {
  const data = await getRawMaterialData()
  const formattedData = data?.data?.map((item) => ({
    id: item.id,
    materialName: item.attributes?.materialName,
    product_category:
      item.attributes?.product_category?.data?.attributes?.categoryName,
    product_category_id: item.attributes?.product_category?.data?.id,
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Raw-Material (${data?.meta?.pagination?.total})`}
          description="Manage Raw Materials for your products"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={formattedData} />}
    </>
  )
}
