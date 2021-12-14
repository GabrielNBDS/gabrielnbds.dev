import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useInjection } from 'inversify-react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import Container from '../../components/Container'
import FormError from '../../components/FormError'
import Loader from '../../components/Loader'
import AuthStore from '../../stores/auth'
import showFormErrors from '../../utils/showFormErrors'

interface FormData {
  name: string
  password: string
}

const VerifyEmail = () => {
  const key = process.browser && window.location.search

  const authStore = useInjection<AuthStore>('AuthStore')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm()

  async function onSubmit({ name, password }: FormData) {
    try {
      await authStore.verifyEmail({ key, name, password })
    } catch (error) {
      showFormErrors(error, setError)
    }
  }

  const { data, error } = useSWR(`/verify-email${key}`)

  if (!data && !error) {
    return <Loader />
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading fontSize="lg">Complete your account</Heading>

      <FormControl isRequired>
        <FormLabel fontWeight="400">Name</FormLabel>
        <Input {...register('name')} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel fontWeight="400">Password</FormLabel>
        <Input {...register('password')} type="password" />
        {errors.password && <FormError>{errors?.password?.message}</FormError>}
      </FormControl>

      <FormControl isReadOnly>
        <FormLabel fontWeight="400">Email</FormLabel>
        <Input value={data.email} cursor="not-allowed" type="email" />
      </FormControl>

      <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
        Complete Account
      </Button>
    </Container>
  )
}

export default VerifyEmail
