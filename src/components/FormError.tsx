import { FormHelperText } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const FormError = ({ children }: Props) => {
  return <FormHelperText color="red.500">{children}</FormHelperText>
}

export default FormError
