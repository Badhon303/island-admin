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

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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

const formSchema = z.object({
  categoryName: z.string().min(1).max(50),
  productType: z.string().min(1).max(50),
  modelCode: z.string().min(1).max(50),
  modelName: z.string().min(1).max(50),
})

export const CategoryModal = ({
  isOpen,
  onClose,
  id,
  productTypeId,
  productCategoryDetailsId,
}) => {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [productTypeData, setProductTypeData] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      productType: "",
      modelCode: "",
      modelName: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        setLoading(true)
        try {
          const categoryResponse = id
            ? await request("GET", `/api/product-categories/${id}`)
            : null
          const productTypeResponse = productTypeId
            ? await request("GET", `/api/product-types/${productTypeId}`)
            : null
          const productCategoryDetailsResponse = productCategoryDetailsId
            ? await request(
                "GET",
                `/api/product-category-details/${productCategoryDetailsId}`
              )
            : null

          const categoryName = categoryResponse?.data?.attributes?.categoryName
          const productType = productTypeResponse?.data?.attributes?.type
          const { modelName, modelCode } =
            productCategoryDetailsResponse?.data?.attributes || {}

          setValue(productType)
          form.reset({
            categoryName: categoryName || "",
            productType: productType || "",
            modelName: modelName || "",
            modelCode: modelCode || "",
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

    fetchData()
  }, [id, form, toast, isOpen, productCategoryDetailsId, productTypeId])

  useEffect(() => {
    const fetchProductType = async () => {
      if (isOpen) {
        try {
          const response = await request("GET", "/api/product-types/")
          const formattedProductTypeData = response.data?.map((item) => ({
            value: item.id,
            label: item.attributes?.type,
          }))
          setProductTypeData(formattedProductTypeData)
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
    fetchProductType()
  }, [isOpen, toast])

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      if (id) {
        const postValues = {
          categoryName: values.categoryName,
          product_type: {
            connect: [productTypeId ? productTypeId : null],
          },
          product_category_detail: {
            connect: [
              productCategoryDetailsId ? productCategoryDetailsId : null,
            ],
          },
        }
        await request("PUT", `/api/product-categories/${id}`, postValues)
      } else {
        const productTypeById = productTypeData.find(
          (type) => type.label === value
        )?.value

        const productCategoryPost = {
          modelName: values.modelName,
          modelCode: values.modelCode,
        }
        const productCategoryDetailsData = await request(
          "POST",
          "/api/product-category-details/",
          productCategoryPost
        )
        const productCategoryDetailsById = productCategoryDetailsData?.data?.id

        const postValues = {
          categoryName: values.categoryName,
          product_type: {
            connect: [productTypeById ? productTypeById : 0],
          },
          product_category_detail: {
            connect: [
              productCategoryDetailsById ? productCategoryDetailsById : 0,
            ],
          },
        }
        await request("POST", "/api/product-categories", postValues)
      }
      router.refresh()
      toast({
        title: `Product Category ${id ? "Updated" : "Created"} successfully`,
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
      title={`${id ? "Update " : "Create"} a Product Category`}
      description={`${
        id ? "Update" : "Add"
      } a new Product Category to manage products and categories.`}
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
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Product Category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
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
                                ? productTypeData.find(
                                    (type) => type.label === value
                                  )?.label
                                : "Select Product Type..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Product Type..."
                                {...field}
                              />
                              <CommandList>
                                <CommandEmpty>
                                  No Product Type found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {productTypeData ? (
                                    productTypeData.map((type) => (
                                      <CommandItem
                                        key={type.value}
                                        value={type.label}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          )
                                          form.setValue(
                                            "productType",
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
                                            value === type.label
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {type.label}
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
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="modelName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Model Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Code</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Model Code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
