import { Heading, Flex, Button } from '@chakra-ui/react'
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi'

const ReachMe = () => {
  return (
    <>
      <Heading as="h3" variant="section-title">
        How to reach me
      </Heading>

      <Flex
        display="inline-flex"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        style={{ gap: '20px' }}
        pt={[4, 8]}
      >
        <Button
          as="a"
          target="_blank"
          href="https://github.com/GabrielNBDS"
          rightIcon={<FiGithub />}
          variant="link"
          colorScheme="teal"
        >
          GitHub
        </Button>

        <Button
          as="a"
          target="_blank"
          href="https://www.linkedin.com/in/gabrielnbds/"
          rightIcon={<FiLinkedin />}
          variant="link"
          colorScheme="teal"
        >
          LinkedIn
        </Button>

        <Button
          as="a"
          target="_blank"
          href="https://twitter.com/gabrielnbds1"
          rightIcon={<FiTwitter />}
          variant="link"
          colorScheme="teal"
        >
          Twitter
        </Button>

        <Button
          as="a"
          target="_blank"
          href="https://www.youtube.com/channel/UCg0ySiDGojCKg1XkiLB1GjQ"
          rightIcon={<FiYoutube />}
          variant="link"
          colorScheme="teal"
        >
          Youtube
        </Button>
      </Flex>
    </>
  )
}

export default ReachMe
