"use server"

import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { sessionOptions, defaultSession } from "@/lib/iron"

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions)
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }
  return session
}
