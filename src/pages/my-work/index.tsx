import {
  Container,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import Section from '../../components/section'

const works = [
  {
    date: 'January 2022 - Now',
    title: 'Full-Stack Developer @ IBM',
    items: ["I'll need more time to answer ⌛"],
  },
  {
    date: 'December 2020 - December 2021',
    title: 'Full-Stack Developer @ wBrain',
    items: ['Digital Transformation', 'Building apps from scratch'],
  },
  {
    date: 'September 2021 - November 2021',
    title: 'Front-End Developer @ ChatComposer',
    items: ['Developing pages for the main product'],
  },
]

interface Work {
  date: string
  title: string
  items: string[]
}

const WorksListItem = ({ date, title, items }: Work) => {
  return (
    <Stack>
      <Text
        fontSize={14}
        fontWeight="500"
        color={useColorModeValue('blackAlpha.700', 'whiteAlpha.500')}
      >
        {date}
      </Text>

      <Heading fontSize={24}>{title}</Heading>

      <Text pt={2}>Responsible for:</Text>

      <List spacing={3}>
        {items.map(item => (
          <ListItem>
            <ListIcon
              as={FiArrowRight}
              color={useColorModeValue('blackAlpha.700', 'whiteAlpha.500')}
            />
            {item}
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

const MyWork = () => {
  return (
    <Container py={24}>
      <Section>
        <Heading variant="section-title">Work</Heading>

        <Stack spacing={4} divider={<Divider />}>
          {works.map(work => (
            <WorksListItem {...work} />
          ))}
        </Stack>
      </Section>
    </Container>
  )
}

export default MyWork