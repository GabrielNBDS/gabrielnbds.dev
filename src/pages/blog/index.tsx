import {
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Cosmic from 'cosmicjs'
import Link from 'next/link'
import Post from '../../interfaces/post'

const api = Cosmic()

export const getServerSideProps: GetServerSideProps = async () => {
  const bucket = api.bucket({
    slug: 'my-personal-blog-production',
    read_key: process.env.READ_KEY,
  })

  try {
    const data = await bucket.getObjects({
      query: {
        type: 'posts',
      },
      props: 'slug,title,metadata',
      limit: 5,
    })

    return {
      props: {
        posts: data.objects,
      },
    }
  } catch (error) {
    return {
      props: {
        posts: [],
      },
    }
  }
}

interface Props {
  posts: Post[]
}

const Blog = ({ posts }: Props) => {
  return (
    <Container maxW="container.md" py={32}>
      <Stack spacing={8} divider={<Divider />}>
        {posts.map(post => (
          <Stack>
            <Text
              fontSize={14}
              fontWeight="500"
              color={useColorModeValue('blackAlpha.700', 'whiteAlpha.500')}
            >
              {post.metadata.date}
            </Text>

            <Link href={`/blog/${post.slug}`}>
              <Heading
                cursor="pointer"
                fontSize={24}
                transition="all .2s"
                _hover={{ color: 'teal.500' }}
              >
                {post.title}
              </Heading>
            </Link>

            <Text>{post.metadata.truncate}</Text>

            <Link href={`/blog/${post.slug}`}>
              <Button
                as="a"
                colorScheme="teal"
                variant="link"
                maxW="max-content"
              >
                Continue reading
              </Button>
            </Link>
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}

export default Blog
