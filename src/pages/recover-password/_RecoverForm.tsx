import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useInjection } from 'inversify-react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import api from '../../services/api'
import AuthStore from '../../stores/auth'
import showFormErrors from '../../utils/showFormErrors'

const RecoverForm = () => {
  const { user } = useInjection<AuthStore>('AuthStore')
  const toast = useToast()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    setError,
  } = useForm()

  const key = process.browser && window.location.search

  async function onSubmit(data: { password: string }) {
    try {
      await api.post(`/recover-password${key}`, data)

      toast({ title: 'Password changed', duration: 1500, status: 'success' })

      if (!user) {
        router.push('/login')

        return
      }

      router.push('/profile')
    } catch (error) {
      showFormErrors(error, setError)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>New password</FormLabel>
        <Input {...register('password')} type="password" />
      </FormControl>

      <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
        Change password
      </Button>
    </Container>
  )
}

export default RecoverForm
