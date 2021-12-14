import { chakra, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Container from '../components/Container'

export default function Custom404() {
  return (
    <Container>
      <Heading mb={4} fontSize="18px">
        Daedalus
      </Heading>

      <Heading mb={4} fontSize="20px">
        Page not found (404)
      </Heading>

      <Text>
        The page you&apos;re looking for may have moved or no longer exists.
        Head back to our{' '}
        <Link href="/">
          <chakra.a cursor="pointer" fontWeight="600">
            homepage
          </chakra.a>
        </Link>
        , or take a look at one of the sections below.
      </Text>
    </Container>
  )
}
