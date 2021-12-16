import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect } from 'react'
import Cosmic from 'cosmicjs'
import { Box, Container, Divider, Heading, Image } from '@chakra-ui/react'
import parse from 'html-react-parser'
import hljs from 'highlight.js'
import Post from '../../interfaces/post'

const api = Cosmic()

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { slug } = ctx.params

  const bucket = api.bucket({
    slug: 'my-personal-blog-production',
    read_key: process.env.READ_KEY,
  })

  const data = await bucket.getObjects({
    type: 'posts',
    props: 'title,content,metadata',
    query: {
      slug,
    },
  })

  return {
    props: {
      post: data.objects[0],
    },
    revalidate: 60 * 60 * 24 * 7, // 1 week
  }
}

interface Props {
  post: Post
}

const Blog: React.FC<Props> = ({ post }) => {
  useEffect(() => {
    const main = document.querySelector('main')
    main.querySelectorAll('a').forEach(el => {
      // Change anchors color to blue
      el.style.color = '#4299e1'
      // Makes anchors target _blank
      el.target = '_blank'
    })

    // Centers images
    main.querySelectorAll('img').forEach(el => {
      el.style.margin = '0 auto'
    })

    // Adds padding to lists
    main.querySelectorAll('ol').forEach(el => {
      el.style.padding = '0 16px'
    })
    main.querySelectorAll('ul').forEach(el => {
      el.style.padding = '0 16px'
    })

    // Highlight code blocks
    main.querySelectorAll('pre').forEach(el => {
      const code = document.createElement('code')
      code.innerHTML = el.innerHTML
      el.innerHTML = ''
      el.appendChild(code)
    })

    hljs.highlightAll()
  }, [])

  return (
    <>
      <Container maxW="80ch" pt={16} pb={6}>
        <Image src={post.metadata.cover.url} />
        <Heading as="h1" my={4}>
          {post.title}
        </Heading>
        <Divider />
        <Box as="main">{parse(post.content)}</Box>
      </Container>
    </>
  )
}

export default Blog
