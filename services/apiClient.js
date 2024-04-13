import axios from "@/utils/axios"

import { getSession } from "@/services/get-session"

axios.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session.jwt) {
      config.headers.Authorization = `Bearer ${session.jwt}`
    }
    return config
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export const get = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config)
    return response.data
  } catch (error) {
    throw error.response
      ? error.response.statusText
      : new Error("Network error")
  }
}

export const post = async (url, values, config = {}) => {
  try {
    const response = await axios.post(url, { data: values }, config)
    return response.data
  } catch (error) {
    throw error.response
      ? error.response.statusText
      : new Error("Network error")
  }
}

export const put = async (url, values, config = {}) => {
  try {
    const response = await axios.put(url, { data: values }, config)
    return response.data
  } catch (error) {
    throw error.response
      ? error.response.statusText
      : new Error("Network error")
  }
}

export const del = async (url, config = {}) => {
  try {
    const response = await axios.delete(url, config)
    return response.data
  } catch (error) {
    throw error.response
      ? error.response.statusText
      : new Error("Network error")
  }
}
