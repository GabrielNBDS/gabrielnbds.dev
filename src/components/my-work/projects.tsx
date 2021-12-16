import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { FiGithub, FiPlay } from 'react-icons/fi'
import Slider from 'react-slick'

const items = [
  {
    image: '/assets/ecollect.png',
    title: 'Ecollect',
    description:
      '"Ecollect" is a marketplace that helps people to find recycling points efficiently.',
    githubLink: 'https://github.com/GabrielNBDS/ecollect',
    demoLink: 'https://ecollect.gabrielnbds.dev/',
  },
  {
    image: '/assets/voteit.png',
    title: 'vote.it',
    description:
      '"vote.it" is the best place to create and vote in any kind of polls.',
    githubLink: 'https://github.com/GabrielNBDS/vote.it',
    demoLink: 'https://voteit.gabrielnbds.dev/',
  },
]

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}

interface ProjectsItemProps {
  image: string
  title: string
  description: string
  githubLink: string
  demoLink: string
}

const ProjectsItem: React.FC<ProjectsItemProps> = ({
  image,
  title,
  description,
  githubLink,
  demoLink,
}) => {
  return (
    <Box>
      <Stack direction={['column', 'column', 'row']} spacing={8} align="center">
        <Image alt={title} maxW={['280px', '280px', '360px']} src={image} />

        <VStack
          maxW={['280px', '280px', '360px']}
          align={['center', 'center', 'flex-start']}
        >
          <Heading as="h2">{title}</Heading>
          <Text textAlign={['center', 'center', 'left']}>{description}</Text>

          <HStack>
            <Button
              as="a"
              target="_blank"
              href={githubLink}
              cursor="pointer"
              colorScheme="teal"
              rightIcon={<Icon as={FiGithub} />}
            >
              Github
            </Button>

            <Button
              as="a"
              target="_blank"
              href={demoLink}
              cursor="pointer"
              colorScheme="teal"
              rightIcon={<Icon as={FiPlay} />}
            >
              Live Demo
            </Button>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  )
}

const Projects: React.FC = () => {
  return (
    <Stack>
      <Container>
        <Heading variant="section-title" fontWeight="600">
          Projects
        </Heading>
      </Container>
      <Slider {...settings}>
        {items.map(item => (
          <ProjectsItem {...item} />
        ))}
      </Slider>
    </Stack>
  )
}

export default Projects
