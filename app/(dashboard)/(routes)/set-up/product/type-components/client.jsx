import { format, parseISO } from "date-fns"
import { getProductTypeData } from "@/actions/product-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function TypeClient() {
  const data = await getProductTypeData()
  const formattedData = data?.data?.map((item) => ({
    id: item.id,
    type: item.attributes?.type,
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product-Type (${data?.meta?.pagination?.total})`}
          description="Manage product type for your products"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && (
        <DataTable searchKey="type" columns={columns} data={formattedData} />
      )}
    </>
  )
}
