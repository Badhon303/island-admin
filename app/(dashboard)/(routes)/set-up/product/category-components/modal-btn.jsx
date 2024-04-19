"use client"

import { useState } from "react"
import { CategoryModal } from "./category-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const ModalBtn = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CategoryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        id={null}
        productTypeId={null}
        productCategoryDetailsId={null}
      />
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </>
  )
}

export default ModalBtn
