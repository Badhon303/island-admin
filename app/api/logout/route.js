import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/services/get-session"

export async function GET() {
  //   const responseApi = await fetch('http://localhost:3003/sign-out');
  //   const resApiJson = responseApi.json();

  //   const response = NextResponse.json(resApiJson);
  // response.cookies.delete('accessToken');
  //   response.cookies.delete("refreshToken")
  //   return response;

  const cookieStore = cookies()
  cookieStore.delete("accessToken")

  const session = await getSession()
  session.destroy()
  return NextResponse.json({
    message: "Logged Out",
  })
}
