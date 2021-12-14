import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  chakra,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import useSteps from '../../hooks/useSteps'
import api from '../../services/api'

interface FormData {
  email: string
}

const CreateAccount = () => {
  const { step, nextStep } = useSteps()

  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  async function onSubmit(data: FormData) {
    try {
      await api.post('/users', data)

      nextStep()
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      {step === 0 && (
        <>
          <Heading fontSize="lg">Create your account</Heading>

          <FormControl isRequired>
            <FormLabel fontWeight="400">Email</FormLabel>
            <Input type="email" {...register('email')} />
          </FormControl>

          <Checkbox isRequired>
            <Text fontSize={15}>
              I accept the{' '}
              <Link href="/terms-of-use">
                <chakra.a
                  fontWeight="500"
                  cursor="pointer"
                  color={useColorModeValue('blue.500', 'blue.300')}
                >
                  Terms of use
                </chakra.a>
              </Link>{' '}
              and the{' '}
              <Link href="/privacy-police">
                <chakra.a
                  fontWeight="500"
                  cursor="pointer"
                  color={useColorModeValue('blue.500', 'blue.300')}
                >
                  Privacy Police
                </chakra.a>
              </Link>
            </Text>
          </Checkbox>

          {error !== '' && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
            Create account
          </Button>

          <HStack>
            <Text fontWeight="500">Already have an account?</Text>
            <Link href="/login">
              <chakra.a
                fontWeight="500"
                cursor="pointer"
                color={useColorModeValue('blue.500', 'blue.300')}
              >
                Login
              </chakra.a>
            </Link>
          </HStack>
        </>
      )}

      {step === 1 && (
        <>
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
              Account created!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              To complete your account{' '}
              <Text fontWeight="600">verify your email.</Text>
            </AlertDescription>
          </Alert>

          <Link href="/login">
            <Button variant="link" as="a" cursor="pointer" colorScheme="blue">
              Go to login
            </Button>
          </Link>
        </>
      )}
    </Container>
  )
}

export default CreateAccount
