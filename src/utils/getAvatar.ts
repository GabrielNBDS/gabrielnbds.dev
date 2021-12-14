export default function getAvatar(path: string) {
  const url = `${
    process.env.NODE_ENV === 'development' && 'http://localhost:3333'
  }${path}`

  return path ? url : null
}
