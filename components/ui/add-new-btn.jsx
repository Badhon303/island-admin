"use client"

import { useState } from "react"
import { CreateModal } from "../modals/create-modal"
import { Button } from "./button"
import { Plus } from "lucide-react"

const AddNewBtn = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <>
      <CreateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        //   onConfirm={onDelete}
        loading={loading}
      />
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </>
  )
}

export default AddNewBtn
