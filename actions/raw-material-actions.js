import { getSession } from "@/services/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getRawMaterialData() {
  const session = await getSession()
  try {
    const data = await fetch(`${url}/api/raw-materials`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    const parsedData = await data.json()
    return parsedData
  } catch (error) {
    console.error("GET /api/raw-materials ", error)
  }
}
