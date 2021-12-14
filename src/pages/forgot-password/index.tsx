import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Container from '../../components/Container'
import FormError from '../../components/FormError'
import useSteps from '../../hooks/useSteps'
import api from '../../services/api'
import showFormErrors from '../../utils/showFormErrors'

const ForgotPassword = () => {
  const { step, nextStep } = useSteps()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm()

  async function onSubmit(data: { email: string }) {
    try {
      await api.post('/forgot-password', data)

      nextStep()
    } catch (err) {
      showFormErrors(err, setError)
    }
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      {step === 0 && (
        <>
          <Heading fontSize={24}>Recover password</Heading>

          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} type="email" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormControl>

          <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
            Recover password
          </Button>
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
              Recovery link sent
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              To change your password{' '}
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

export default ForgotPassword
