// import { format } from "date-fns"

// import { SizeColumn } from "./components/columns"
// import { SizesClient } from "./components/client"

const SizesPage = async ({ params }) => {
  const uel = process.env.NEXT_PUBLIC_BASE_URL
  // const sizes = await

  // const formattedSizes = sizes.map((item) => ({
  //   id: item.id,
  //   name: item.name,
  //   value: item.value,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* <SizesClient data={formattedSizes} /> */}
        hello
      </div>
    </div>
  )
}

export default SizesPage
