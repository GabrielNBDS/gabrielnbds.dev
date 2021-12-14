import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import FormError from '../../components/FormError'
import api from '../../services/api'
import showFormErrors from '../../utils/showFormErrors'

interface FormData {
  password: string
  newPassword: string
}

const ChangePassword = () => {
  const router = useRouter()
  const toast = useToast()

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm()

  async function onSubmit(data: FormData) {
    try {
      await api.post('/users/change-password', data)

      router.push('/profile')

      toast({ title: 'Password changed', duration: 1500, status: 'success' })
    } catch (err) {
      showFormErrors(err, setError)
    }
  }
  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading fontSize={{ base: '2xl', sm: '3xl' }}>Change Password</Heading>

      <FormControl isRequired isInvalid={errors.password}>
        <FormLabel>Current Password</FormLabel>
        <Input type="password" {...register('password')} />
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </FormControl>

      <FormControl isRequired isInvalid={errors.newPassword}>
        <FormLabel>New Password</FormLabel>
        <Input type="password" {...register('newPassword')} />
        {errors.newPassword && (
          <FormError>{errors.newPassword.message}</FormError>
        )}
      </FormControl>

      <Stack spacing={6} direction={['column-reverse', 'row']}>
        <Link href="/profile/edit">
          <Button cursor="pointer" as="a" colorScheme="red" w="full">
            Cancel
          </Button>
        </Link>

        <Button type="submit" colorScheme="blue" w="full">
          Change Password
        </Button>
      </Stack>
    </Container>
  )
}

export default ChangePassword
