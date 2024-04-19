import urlJoin from "url-join"
import { getSession } from "@/utils/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getProductTypeData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/product-types")
  if (!session) {
    console.error("Session is null or undefined")
    return null
  }
  try {
    const data = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    if (data.ok) {
      const parsedData = await data.json()
      if (!parsedData) {
        return null
      }
      if (
        Number(parsedData?.meta?.pagination?.total) > 500 &&
        Number(parsedData?.meta?.pagination?.total) < 5001
      ) {
        const apiUrl = urlJoin(
          url,
          `/api/product-types?pagination[pageSize]=${parsedData?.meta?.pagination?.total}&pagination[page]=1`
        )
        try {
          const data = await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.jwt}`,
            },
          })
          if (data.ok) {
            const parsedData = await data.json()
            if (!parsedData) {
              return null
            }
            // console.log("total: ", parsedData?.meta?.pagination?.total)
            return parsedData
          } else {
            console.error(
              "GET /api/product-types failed with status",
              data.status
            )
          }
        } catch (error) {
          // console.error("GET /api/product-types ", error)
          throw new Error("Need to reconsider about page size, its too high.")
        }
      }
      return parsedData
    } else {
      console.error("GET /api/product-types failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/product-types ", error)
    throw new Error(`GET /api/product-types ${error}`)
  }
}

export async function getProductCategoryData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/product-categories?populate=*")
  if (!session) {
    console.error("Session is null or undefined")
    return null
  }
  try {
    const data = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    if (data.ok) {
      const parsedData = await data.json()
      if (!parsedData) {
        return null
      }
      if (
        Number(parsedData?.meta?.pagination?.total) > 500 &&
        Number(parsedData?.meta?.pagination?.total) < 5001
      ) {
        const apiUrl = urlJoin(
          url,
          `/api/product-categories?pagination[pageSize]=${parsedData?.meta?.pagination?.total}&pagination[page]=1?populate=*`
        )
        try {
          const data = await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.jwt}`,
            },
          })
          if (data.ok) {
            const parsedData = await data.json()
            if (!parsedData) {
              return null
            }
            // console.log("total: ", parsedData?.meta?.pagination?.total)
            return parsedData
          } else {
            console.error(
              "GET /api/product-categories failed with status",
              data.status
            )
          }
        } catch (error) {
          // console.error("GET /api/product-categories ", error)
          throw new Error("Need to reconsider about page size, its too high.")
        }
      }
      return parsedData
    } else {
      console.error(
        "GET /api/product-categories failed with status",
        data.status
      )
    }
  } catch (error) {
    // console.error("GET /api/product-categories ", error)
    throw new Error(`GET /api/product-categories ${error}`)
  }
}

export async function getProductData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/products?populate=*")
  if (!session) {
    console.error("Session is null or undefined")
    return null
  }
  try {
    const data = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    if (data.ok) {
      const parsedData = await data.json()
      if (!parsedData) {
        return null
      }
      if (
        Number(parsedData?.meta?.pagination?.total) > 500 &&
        Number(parsedData?.meta?.pagination?.total) < 5001
      ) {
        const apiUrl = urlJoin(
          url,
          `/api/products?pagination[pageSize]=${parsedData?.meta?.pagination?.total}&pagination[page]=1?populate=*`
        )
        try {
          const data = await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.jwt}`,
            },
          })
          if (data.ok) {
            const parsedData = await data.json()
            if (!parsedData) {
              return null
            }
            // console.log("total: ", parsedData?.meta?.pagination?.total)
            return parsedData
          } else {
            console.error("GET /api/products failed with status", data.status)
          }
        } catch (error) {
          // console.error("GET /api/products ", error)
          throw new Error("Need to reconsider about page size, its too high.")
        }
      }
      return parsedData
    } else {
      console.error("GET /api/products failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/products ", error)
    throw new Error(`GET /api/products ${error}`)
  }
}
