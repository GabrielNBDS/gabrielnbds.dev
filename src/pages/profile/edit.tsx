import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FiChevronLeft, FiSave } from 'react-icons/fi'
import Container from '../../components/Container'
import withAuth from '../../components/withAuth'
import api from '../../services/api'
import AuthStore from '../../stores/auth'
import showFormErrors from '../../utils/showFormErrors'

interface FormData {
  name: string
}

const Edit = () => {
  const { user, setUser } = useInjection<AuthStore>('AuthStore')
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    formState: {
      isSubmitting,
      //  errors
    },
    setError,
    handleSubmit,
  } = useForm()

  async function onSubmit(data: FormData) {
    try {
      const response = await api.put('/users/update-profile', data)

      router.push('/profile')

      setUser(response.data)

      toast({ title: 'Profile updated', duration: 1500, status: 'success' })
    } catch (err) {
      showFormErrors(err, setError)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input {...register('name')} defaultValue={user.name} />
      </FormControl>

      <Button
        isLoading={isSubmitting}
        colorScheme="blue"
        type="submit"
        rightIcon={<FiSave />}
      >
        Confirm changes
      </Button>

      <Stack pb={4} spacing={6} direction={['column', 'row']}>
        <Link href="/profile/change-password">
          <Button
            isDisabled={isSubmitting}
            cursor="pointer"
            as="a"
            colorScheme="blue"
            variant="outline"
            w="full"
          >
            Change Password
          </Button>
        </Link>

        <Link href="/profile/change-email">
          <Button
            isDisabled={isSubmitting}
            cursor="pointer"
            as="a"
            colorScheme="blue"
            variant="outline"
            w="full"
          >
            Change Email
          </Button>
        </Link>
      </Stack>

      <Link href="/profile">
        <Button
          isDisabled={isSubmitting}
          as="a"
          cursor="pointer"
          leftIcon={<FiChevronLeft />}
          mr="auto"
          variant="link"
          style={{ maxWidth: 'max-content' }}
        >
          Go back
        </Button>
      </Link>
    </Container>
  )
}

export default withAuth(observer(Edit))
