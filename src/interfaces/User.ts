interface User {
  id: number
  avatar: { url: string } | null
  name: string
  email: string
}

export default User
