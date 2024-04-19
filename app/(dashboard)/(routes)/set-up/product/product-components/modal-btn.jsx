"use client"

import { useState } from "react"
import { ProductModal } from "./product-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const ModalBtn = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        id={null}
        productCategoryId={null}
      />
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </>
  )
}

export default ModalBtn
