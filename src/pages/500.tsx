import { Container, Heading, Text } from '@chakra-ui/react'

export default function Custom500() {
  return (
    <Container>
      <Heading mb={4} fontSize="18px">
        Daedalus
      </Heading>

      <Heading mb={4} fontSize="20px">
        Internal Server Error (500)
      </Heading>

      <Text w={{ base: '100%', lg: '420px' }}>
        Sorry this is not working properly. We know about this issue and we are
        working to fix it. Thanks for understanding!
      </Text>
    </Container>
  )
}
