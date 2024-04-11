import { get } from "@/services/apiClient"

export async function getRawMaterialData() {
  try {
    const data = await get("/api/raw-materials")
    return data
  } catch (error) {
    console.error("GET /api/raw-materials error: ", error)
  }
}
