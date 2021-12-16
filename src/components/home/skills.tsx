import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import Section from '../section'

const Skills: React.FC = () => {
  return (
    <>
      <Container>
        <Heading as="h3" variant="section-title">
          Skills
        </Heading>
      </Container>

      <Flex
        display="inline-flex"
        w="100%"
        flexWrap="wrap"
        justifyContent="center"
        style={{ gap: '16px' }}
        pt={[4, 8]}
      >
        <Section delay={2}>
          <Tooltip label="Javascript">
            <Image
              src="/assets/js.svg"
              h="80px"
              w="80px"
              alt="Javascript Logo"
            />
          </Tooltip>
        </Section>

        <Section delay={2.2}>
          <Tooltip label="Typescript">
            <Image
              src="/assets/ts.svg"
              h="80px"
              w="80px"
              alt="Typescript Logo"
            />
          </Tooltip>
        </Section>

        <Section delay={2.4}>
          <Tooltip label="React">
            <Image src="/assets/react.svg" h="80px" w="80px" alt="React Logo" />
          </Tooltip>
        </Section>

        <Section delay={2.6}>
          <Tooltip label="NextJS">
            <Image
              src="/assets/next.svg"
              bg={useColorModeValue('transparent', 'white')}
              p={useColorModeValue(0, 2)}
              h="80px"
              w="80px"
              alt="NextJS Logo"
            />
          </Tooltip>
        </Section>

        <Section delay={2.8}>
          <Tooltip label="Firebase">
            <Image
              src="/assets/firebase.svg"
              h="80px"
              w="80px"
              alt="Firebase Logo"
            />
          </Tooltip>
        </Section>

        <Section delay={3}>
          <Tooltip label="AdonisJS">
            <Box
              background="url('/assets/adonis.png')"
              h="80px"
              px={1}
              w="80px"
              alt="Adonis Logo"
              bgSize="cover"
            />
          </Tooltip>
        </Section>

        <Section delay={3.2}>
          <Tooltip label="NodeJS">
            <Image
              src="/assets/node.png"
              h="80px"
              px={1}
              w="80px"
              alt="NodeJS Logo"
            />
          </Tooltip>
        </Section>
      </Flex>
    </>
  )
}

export default Skills
