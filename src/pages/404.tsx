import { chakra, Container, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Container py={24} pb={6}>
      <Heading mb={4} fontSize="20px">
        Page not found (404)
      </Heading>

      <Text>
        The page you&apos;re looking for may have moved or no longer exists.
        Head back to{' '}
        <Link href="/">
          <chakra.a cursor="pointer" fontWeight="600">
            homepage
          </chakra.a>
        </Link>
        .
      </Text>
    </Container>
  )
}
