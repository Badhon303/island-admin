const url = process.env.NEXT_PUBLIC_BASE_URL
const token = process.env.NEXT_PUBLIC_TOKEN

export async function getRawMaterialData() {
  const res = await fetch(`${url}/api/raw-materials`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return await res.json()
}
