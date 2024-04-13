import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getSession } from "@/services/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function POST(req) {
  const body = await req.json()
  try {
    const response = await fetch(`${url}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: body.identifier,
        password: body.password,
      }),
    })
    const resJson = await response.json()
    if (resJson.jwt) {
      cookies().set("accessToken", resJson.jwt, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
      })
      // cookies().set("refreshToken", resJson.refreshToken, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60,
      // })
      // delete resJson.jwt
      // delete resJson.refreshToken

      const session = await getSession()
      session.jwt = resJson.jwt
      session.user = resJson.user
      session.isLoggedIn = true
      await session.save()
    }
    delete resJson.jwt
    return NextResponse.json(resJson)
  } catch (error) {
    console.log("login error: ", error)
    return NextResponse.json({
      error: error,
    })
  }
}
