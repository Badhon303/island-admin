import { format, parseISO } from "date-fns"
import { getProductData } from "@/actions/product-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function ProductClient() {
  const data = await getProductData()
  const formattedData = data?.data?.map((item) => ({
    id: item.id,
    productName: item.attributes?.productName,
    product_category:
      item.attributes?.product_category?.data?.attributes?.categoryName,
    product_category_id: item.attributes?.product_category?.data?.id,
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${data?.meta?.pagination?.total})`}
          description="Manage your products"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={formattedData} />}
    </>
  )
}
