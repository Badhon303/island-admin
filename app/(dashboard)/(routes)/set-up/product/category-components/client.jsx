import { format, parseISO } from "date-fns"
import { getProductCategoryData } from "@/actions/product-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function CategoryClient() {
  const data = await getProductCategoryData()
  const formattedData = data?.data?.map((item) => ({
    id: item.id,
    categoryName: item.attributes?.categoryName,
    product_type: item.attributes?.product_type?.data?.attributes?.type,
    product_type_id: item.attributes?.product_type?.data?.id,
    product_category_detail:
      item.attributes?.product_category_detail?.data?.attributes?.modelCode,
    product_category_detail_id:
      item.attributes?.product_category_detail?.data?.id,
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product-Category (${data?.meta?.pagination?.total})`}
          description="Manage category for your products"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={formattedData} />}
    </>
  )
}
