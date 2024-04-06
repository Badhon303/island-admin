const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getRawMaterialData() {
  console.log(url)
  const res = await fetch(`${url}/api/raw-materials`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzExOTY0MzczLCJleHAiOjE3MTQ1NTYzNzN9.G8HdR0N6ejRJ7oxc0BzNDhTA3q3MRUL56h0aIz7TO1w",
    },
    cache: "no-store",
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return await res.json()
}
