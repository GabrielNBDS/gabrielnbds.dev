import { makeAutoObservable } from 'mobx'
import Router from 'next/router'
import User from '../interfaces/User'
import api from '../services/api'

interface SignInData {
  email: string
  password: string
}

interface VerifyData {
  key: string
  name: string
  password: string
}

export default class AuthStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    this.getUserData()
  }

  user: User | null = null

  avatar: string | null = null

  loading = true

  setUser(data: User | null) {
    this.user = data
  }

  async getUserData() {
    if (!process.browser) {
      return
    }

    try {
      const token = localStorage.getItem('@daedalus.token')

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      const response = await api.get('/users/me')

      const userData = response.data as User

      this.setUser(userData)

      this.loading = false
    } catch {
      localStorage.removeItem('@daedalus.token')
      this.setUser(null)
    }
  }

  async signIn(data: SignInData) {
    try {
      this.loading = true

      const response = await api.post('/auth', data)

      const { token } = response.data

      localStorage.setItem('@daedalus.token', token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      this.getUserData()
    } catch (error) {
      this.loading = false

      return Promise.reject(error)
    }
  }

  async signUp(email: string) {
    await api.post('/users', { email })
  }

  async verifyEmail({ key, name, password }: VerifyData) {
    const response = await api.post(`/verify-email${key}`, { name, password })

    const { token } = response.data

    localStorage.setItem('@daedalus.token', token)

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    this.getUserData()

    Router.push('/profile')
  }

  async signOut() {
    api.delete('/auth')

    localStorage.removeItem('@daedalus.token')

    this.loading = true

    this.setUser(null)

    Router.push('/')
  }
}
