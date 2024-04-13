"use client"

import { get, put, post } from "@/services/apiClient"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

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
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  materialName: z.string().min(1),
})

export const RawModal = ({ isOpen, onClose, id }) => {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialName: "",
    },
  })

  useEffect(() => {
    const fetchMaterial = async () => {
      if (id !== "" && isOpen) {
        try {
          setLoading(true)
          const response = await get(`/api/raw-materials/${id}`)
          const materialData = response.data?.attributes
          form.reset({ materialName: materialData.materialName })
        } catch (error) {
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load material details.",
          })
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMaterial()
  }, [id, form, toast, isOpen])

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      if (id) {
        await put(`/api/raw-materials/${id}`, values)
      } else {
        await post("/api/raw-materials", values)
      }
      router.refresh()
      toast({
        title: `Raw Material ${id ? "Updated" : "Created"} successfully`,
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
      title={`${id ? "Update " : "Create"} a Raw Material`}
      description={`${
        id ? "Update" : "Add"
      } a new Raw Material to manage products and categories.`}
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
                    {loading ? (
                      <span className="spinner"></span>
                    ) : id ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
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
