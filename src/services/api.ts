import axios from 'axios'
import Router from 'next/router'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('@daedalus.token')
      Router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default api
