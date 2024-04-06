"use client"

import { useState } from "react"
import { RawModal } from "./raw-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const ModalBtn = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <RawModal isOpen={open} onClose={() => setOpen(false)} id="" />
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </>
  )
}

export default ModalBtn
