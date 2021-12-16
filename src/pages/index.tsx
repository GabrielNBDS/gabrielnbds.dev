import Head from 'next/head'
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import Section from '../components/section'
import Skills from '../components/home/skills'
import Work from '../components/home/work'
import ReachMe from '../components/home/reache-me'

function Home() {
  return (
    <Box pt={24} pb={6}>
      <Head>
        <title>boilerplate</title>
        <meta
          property="og:image"
          content="https://nextjs.org/static/twitter-cards/home.jpg"
        />
      </Head>
      <Container>
        <Stack spacing={8} as="main">
          <Section>
            <Heading
              textAlign="center"
              p={3}
              bg={useColorModeValue('whiteAlpha.600', 'whiteAlpha.300')}
              borderRadius="lg"
              fontWeight="500"
              fontSize={16}
            >
              Hello, I&apos;m a full-stack developer based in Brazil!
            </Heading>
          </Section>

          <Section delay={0.4}>
            <VStack pt={8} align="flex-start">
              <Heading>Gabriel de Souza</Heading>

              <Text>
                Digital jack of all trades ( Developer / Designer / DevOps )
              </Text>
            </VStack>
          </Section>

          <Section delay={0.8}>
            <ReachMe />
          </Section>

          <Section delay={1.2}>
            <Work />
          </Section>
        </Stack>
      </Container>

      <Section pt={8} delay={1.6}>
        <Skills />
      </Section>
    </Box>
  )
}

export default Home
