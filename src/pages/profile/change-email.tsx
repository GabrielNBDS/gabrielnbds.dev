import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import FormError from '../../components/FormError'
import useSteps from '../../hooks/useSteps'
import api from '../../services/api'
import showFormErrors from '../../utils/showFormErrors'

interface FormData {
  email: string
  password: string
}

const ChangeEmail = () => {
  const { step, nextStep } = useSteps()

  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
  } = useForm()

  async function onSubmit(data: FormData) {
    try {
      await api.post('/users/request-change-email', data)

      nextStep()
    } catch (err) {
      showFormErrors(err, setError)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      {step === 0 && (
        <>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Change Email
          </Heading>

          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel>New email</FormLabel>
            <Input type="email" {...register('email')} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormControl>

          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel>Current Password</FormLabel>
            <Input type="password" {...register('password')} />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </FormControl>

          <Stack spacing={6} direction={['column-reverse', 'row']}>
            <Link href="/profile/edit">
              <Button
                isDisabled={isSubmitting}
                cursor="pointer"
                as="a"
                colorScheme="red"
                w="full"
              >
                Cancel
              </Button>
            </Link>

            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              w="full"
            >
              Change Email
            </Button>
          </Stack>
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
            <AlertIcon boxSize="40px" mr={0} mb={2} />
            <AlertDescription maxWidth="sm">
              To complete the change{' '}
              <Text fontWeight="600">verify your email.</Text>
            </AlertDescription>

            <Link href="/profile">
              <Button
                mt={2}
                variant="link"
                as="a"
                cursor="pointer"
                colorScheme="blue"
              >
                Go Back
              </Button>
            </Link>
          </Alert>
        </>
      )}
    </Container>
  )
}

export default ChangeEmail
