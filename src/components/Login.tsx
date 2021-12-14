import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthStore from '../stores/auth'
import Container from './Container'

interface FormData {
  email: string
  password: string
}

interface Props {
  pushTo?: string
}

const Login = ({ pushTo }: Props) => {
  const { signIn } = useInjection<AuthStore>('AuthStore')

  const router = useRouter()

  const [error, setError] = useState(false)

  const {
    formState: { isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm()

  async function onSubmit(data: FormData) {
    setError(false)

    try {
      await signIn(data)

      if (pushTo) {
        router.push(pushTo)
      }
    } catch {
      setError(true)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Heading fontSize="lg" pb={4}>
          Login to your account
        </Heading>

        <FormControl isRequired>
          <HStack justify="space-between">
            <FormLabel fontWeight="400">Email</FormLabel>

            <Link href="/create-account">
              <chakra.a
                cursor="pointer"
                color={useColorModeValue('blue.500', 'blue.300')}
              >
                Create account
              </chakra.a>
            </Link>
          </HStack>
          <Input {...register('email')} type="email" />
        </FormControl>

        <FormControl isRequired id="password">
          <HStack justify="space-between">
            <FormLabel fontWeight="400">Password</FormLabel>

            <Link href="/forgot-password">
              <chakra.a
                cursor="pointer"
                color={useColorModeValue('blue.500', 'blue.300')}
              >
                Forgot password?
              </chakra.a>
            </Link>
          </HStack>
          <Input {...register('password')} type="password" />
        </FormControl>

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Wrong credentials</AlertTitle>
          </Alert>
        )}

        <Button
          isLoading={isSubmitSuccessful && !error}
          type="submit"
          colorScheme="blue"
        >
          Login
        </Button>
      </Stack>
    </Container>
  )
}

export default observer(Login)
