import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { ReactNode } from 'react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  },
})

interface Props {
  children: ReactNode
  delay?: number
  [x: string]: unknown
}

const Section = ({ children, delay = 0, ...rest }: Props) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: '0.3', delay: delay.toString() }}
    mb={6}
    {...rest}
  >
    {children}
  </StyledDiv>
)

export default Section
