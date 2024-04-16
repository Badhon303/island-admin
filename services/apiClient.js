// "use server"

// import axios from "@/utils/axios"

// export const get = async (url, config = {}) => {
//   try {
//     const response = await axios.get(url, config)
//     return response.data
//   } catch (error) {
//     throw error.response
//       ? error.response.statusText
//       : new Error("Network error")
//   }
// }

// export const post = async (url, values, config = {}) => {
//   try {
//     const response = await axios.post(url, { data: values }, config)
//     return response.data
//   } catch (error) {
//     throw error.response
//       ? error.response.statusText
//       : new Error("Network error")
//   }
// }

// export const put = async (url, values, config = {}) => {
//   try {
//     const response = await axios.put(url, { data: values }, config)
//     return response.data
//   } catch (error) {
//     throw error.response
//       ? error.response.statusText
//       : new Error("Network error")
//   }
// }

// export const del = async (url, config = {}) => {
//   try {
//     const response = await axios.delete(url, config)
//     return response.data
//   } catch (error) {
//     throw error.response
//       ? error.response.statusText
//       : new Error("Network error")
//   }
// }

"use server"

import axios from "@/utils/axios"
import axiosRetry from "axios-retry"
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

class CustomError extends Error {
  constructor(message, status, headers) {
    super(message)
    this.name = "CustomError"
    this.status = status
    this.headers = headers
  }
}

export const request = async (method, url, values, config = {}) => {
  try {
    const response = await axios.request({
      method,
      url,
      data: values,
      ...config,
    })
    return response.data
  } catch (error) {
    throw error.response
      ? new CustomError(
          error.response.statusText,
          error.response.status,
          error.response.headers
        )
      : new CustomError("Network error")
  }
}
