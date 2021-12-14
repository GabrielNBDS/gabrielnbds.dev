import { chakra, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import api from '../../services/api'
import RecoverForm from './_RecoverForm'

const RecoverPassword = () => {
  const key = process.browser && window.location.search

  const [responseStatus, setResponseStatus] = useState(0)

  useEffect(() => {
    api
      .get(`/recover-password${key}`)
      .then(response => setResponseStatus(response.status))
      .catch(error => setResponseStatus(error.response.status))
  }, [])

  if (responseStatus === 0) {
    return <Loader />
  }

  if (responseStatus === 201) {
    return <RecoverForm />
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
        The link you used is invalid or expired. Go back to{' '}
        <Link href="/login">
          <chakra.a cursor="pointer" fontWeight="600">
            Login.
          </chakra.a>
        </Link>
      </Text>
    </Container>
  )
}

export default RecoverPassword
