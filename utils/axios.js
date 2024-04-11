// utils/axios.js
const url = process.env.NEXT_PUBLIC_BASE_URL
const token = process.env.NEXT_PUBLIC_TOKEN

import axios from "axios"

const axiosInstance = axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + `${token}`,
  },
})

export default axiosInstance
