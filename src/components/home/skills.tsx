import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
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
          <Image src="/assets/js.svg" h="80px" w="80px" alt="Javascript Logo" />
        </Section>

        <Section delay={2.2}>
          <Image src="/assets/ts.svg" h="80px" w="80px" alt="Typescript Logo" />
        </Section>

        <Section delay={2.4}>
          <Image src="/assets/react.svg" h="80px" w="80px" alt="React Logo" />
        </Section>

        <Section delay={2.6}>
          <Image
            src="/assets/next.svg"
            bg={useColorModeValue('transparent', 'white')}
            p={useColorModeValue(0, 2)}
            h="80px"
            w="80px"
            alt="NextJS Logo"
          />
        </Section>

        <Section delay={2.8}>
          <Image
            src="/assets/firebase.svg"
            h="80px"
            w="80px"
            alt="Firebase Logo"
          />
        </Section>

        <Section delay={3}>
          <Box
            background="url('/assets/adonis.png')"
            h="80px"
            px={1}
            w="80px"
            alt="Adonis Logo"
            bgSize="cover"
          />
        </Section>

        <Section delay={3.2}>
          <Image
            src="/assets/node.png"
            h="80px"
            px={1}
            w="80px"
            alt="NodeJS Logo"
          />
        </Section>
      </Flex>
    </>
  )
}

export default Skills
