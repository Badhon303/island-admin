"use server"

import axios from "axios"
import { getSession } from "@/utils/get-session"

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
})

let cachedSession = null

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      if (!cachedSession) {
        cachedSession = await getSession()
      }
      const modifiedConfig = { ...config } // Create a copy of the config object
      if (cachedSession.jwt) {
        modifiedConfig.headers.Authorization = `Bearer ${cachedSession.jwt}`
      }
      return modifiedConfig
    } catch (error) {}
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
