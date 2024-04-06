"use client"

const url = process.env.NEXT_PUBLIC_BASE_URL

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import { useStoreModal } from "@/hooks/use-store-modal"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  materialName: z.string().min(1),
})

export const CreateModal = ({ isOpen, onClose }) => {
  //   const storeModal = useStoreModal()
  const { toast } = useToast()
  const router = useRouter()
  //   const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialName: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const response = await axios.put(
        `${url}/api/raw-materials/2`,
        {
          data: values,
        },
        {
          headers: {
            // Add the Authorization header with the bearer token
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzExOTY0MzczLCJleHAiOjE3MTQ1NTYzNzN9.G8HdR0N6ejRJ7oxc0BzNDhTA3q3MRUL56h0aIz7TO1w`,
          },
        }
      )
      router.refresh()
      toast({
        title: "Raw Material Created successfully",
        description: "Time date will be updated",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <Modal
      title="Create a Raw Material"
      description="Add a new Raw Material to manage products and categories."
      //   isOpen={storeModal.isOpen}
      //   onClose={storeModal.onClose}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="materialName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Material Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Create
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
