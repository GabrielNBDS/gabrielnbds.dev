interface Post {
  slug: string
  title: string
  content: string
  metadata: {
    short_description: string
    date: string
    truncate: string
    cover: {
      url: string
    }
  }
}

export default Post
