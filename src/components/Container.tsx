import { Stack, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  [x: string]: unknown
}

const Container = ({ children, ...rest }: Props) => {
  return (
    <Stack
      spacing={4}
      w="full"
      maxW="md"
      bg={useColorModeValue('white', 'gray.800')}
      rounded="5px"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      p={6}
      mt={4}
      mb={12}
      mx="auto"
      {...rest}
    >
      {children}
    </Stack>
  )
}

export default Container
