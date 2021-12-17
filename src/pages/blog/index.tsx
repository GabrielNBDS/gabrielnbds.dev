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
import SEO from '../../components/seo'

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

const ListItem = ({ metadata, slug, title }: Post) => {
  return (
    <Stack>
      <Text
        fontSize={14}
        fontWeight="500"
        color={useColorModeValue('blackAlpha.700', 'whiteAlpha.500')}
      >
        {metadata.date}
      </Text>

      <Link href={`/blog/${slug}`}>
        <Heading
          cursor="pointer"
          fontSize={24}
          transition="all .2s"
          _hover={{ color: 'teal.500' }}
        >
          {title}
        </Heading>
      </Link>

      <Text>{metadata.truncate}</Text>

      <Link href={`/blog/${slug}`}>
        <Button as="a" colorScheme="teal" variant="link" maxW="max-content">
          Continue reading
        </Button>
      </Link>
    </Stack>
  )
}

interface Props {
  posts: Post[]
}

const Blog = ({ posts }: Props) => {
  return (
    <>
      <SEO
        title="Blog"
        description="Gabriel's blog index page"
        shouldIndexPage
      />

      <Container maxW="container.md" pt={24} pb={6}>
        <Stack spacing={8} divider={<Divider />}>
          {posts.map(post => (
            <ListItem {...post} />
          ))}
        </Stack>
      </Container>
    </>
  )
}

export default Blog
