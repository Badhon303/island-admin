import urlJoin from "url-join"
import { getSession } from "@/utils/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getRawMaterialData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/raw-materials")
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
      return parsedData
    } else {
      console.error("GET /api/raw-materials failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/raw-materials ", error)
    throw new Error(`GET /api/raw-materials ${error}`)
  }
}
