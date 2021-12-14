import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  chakra,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import api from '../../services/api'

const VerifyEmail = () => {
  const key = process.browser && window.location.search

  const [responseStatus, setResponseStatus] = useState(0)

  useEffect(() => {
    if (key) {
      api
        .get(`/change-email${key}`)
        .then(response => {
          setResponseStatus(response.status)
        })
        .catch(error => {
          setResponseStatus(error.response.status)
        })
    }
  }, [key])

  if (responseStatus === 0) {
    return <Loader />
  }

  if (responseStatus === 201) {
    return (
      <Container>
        <VStack>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            bg="transparent"
          >
            <AlertIcon boxSize="40px" mr={0} />

            <AlertTitle mt={4} mb={1} fontSize="lg">
              Email changed
            </AlertTitle>

            <Link href="/profile">
              <Button
                mt={2}
                variant="link"
                as="a"
                cursor="pointer"
                colorScheme="blue"
              >
                Go to profile
              </Button>
            </Link>
          </Alert>
        </VStack>
      </Container>
    )
  }

  return (
    <Container>
      <Heading mb={4} fontSize="18px">
        Daedalus
      </Heading>

      <Heading mb={4} fontSize="20px">
        Invalid or expired signature
      </Heading>

      <Text>
        The link you used is invalid or expired. Go to{' '}
        <Link href="/profile">
          <chakra.a cursor="pointer" fontWeight="600">
            your profile{' '}
          </chakra.a>
        </Link>
        to try again.
      </Text>
    </Container>
  )
}

export default VerifyEmail
