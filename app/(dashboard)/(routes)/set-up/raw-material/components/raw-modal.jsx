"use client"

import { request } from "@/services/apiClient"

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

import { Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  materialName: z.string().min(1),
  productCategoryName: z.string().min(1).max(50),
})

export const RawModal = ({ isOpen, onClose, id, productCategoryId }) => {
  const { toast } = useToast()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  const [productCategoryData, setProductCategoryData] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materialName: "",
      productCategoryName: "",
    },
  })

  useEffect(() => {
    const fetchMaterial = async () => {
      if (isOpen) {
        setLoading(true)
        try {
          const materialResponse = id
            ? await request("GET", `/api/raw-materials/${id}`)
            : null
          const productCategoryResponse = productCategoryId
            ? await request(
                "GET",
                `/api/product-categories/${productCategoryId}`
              )
            : null

          const materialName = materialResponse?.data?.attributes?.materialName
          const categoryName =
            productCategoryResponse?.data?.attributes?.categoryName

          setValue(categoryName)

          form.reset({
            materialName: materialName || "",
            categoryName: categoryName || "",
          })
        } catch (error) {
          console.log("error: ", error)
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load details.",
          })
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMaterial()
  }, [id, form, toast, isOpen, productCategoryId])

  useEffect(() => {
    const fetchProductCategory = async () => {
      if (isOpen) {
        try {
          const response = await request("GET", "/api/product-categories/")
          const formattedProductCategoryData = response.data?.map((item) => ({
            value: item.id,
            label: item.attributes?.categoryName,
          }))
          setProductCategoryData(formattedProductCategoryData)
        } catch (error) {
          console.log("error: ", error)
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load Product Category details.",
          })
        }
      }
    }
    fetchProductCategory()
  }, [isOpen, toast])

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const productCategoryById = productCategoryData.find(
        (category) => category.label === value
      )?.value
      const postValues = {
        materialName: values.materialName,
        product_category: {
          connect: [productCategoryById],
        },
      }
      if (id) {
        await request("PUT", `/api/raw-materials/${id}`, postValues)
      } else {
        await request("POST", "/api/raw-materials", postValues)
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
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
                <FormField
                  control={form.control}
                  name="productCategoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {value
                                ? productCategoryData.find(
                                    (category) => category.label === value
                                  )?.label
                                : "Select Product category..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Product Category..."
                                {...field}
                              />
                              <CommandList>
                                <CommandEmpty>
                                  No Product Type found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {productCategoryData ? (
                                    productCategoryData.map((category) => (
                                      <CommandItem
                                        key={category.value}
                                        value={category.label}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          )
                                          form.setValue(
                                            "productCategoryName",
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          )
                                          setOpen(false)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category.label
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {category.label}
                                      </CommandItem>
                                    ))
                                  ) : (
                                    <CommandItem>Loading...</CommandItem>
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
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
