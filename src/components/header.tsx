import {
  Box,
  useColorModeValue,
  Container,
  HStack,
  Heading,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FiMoon, FiSun, FiMenu } from 'react-icons/fi'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box as="header" bg={useColorModeValue('white', 'gray.800')}>
      <Container py={2} maxW="container.md">
        <HStack justify="space-between">
          <Link href="/">
            <Heading
              as="h1"
              fontSize="24"
              fontWeight="600"
              cursor="pointer"
              transition="all .2s"
              _hover={{ color: 'teal.400' }}
            >
              GabrielNBDS
            </Heading>
          </Link>

          <HStack as="nav" display={['none', 'flex']} spacing={4}>
            <Link href="/my-work">
              <Button
                as="a"
                cursor="pointer"
                transition="all .2s"
                _hover={{ color: 'teal.400' }}
                variant="link"
              >
                My Work
              </Button>
            </Link>

            <Link href="/blog">
              <Button
                as="a"
                cursor="pointer"
                transition="all .2s"
                _hover={{ color: 'teal.400' }}
                variant="link"
              >
                Blog
              </Button>
            </Link>

            <IconButton
              variant="ghost"
              aria-label="toggle theme"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />
          </HStack>

          <HStack display={['flex', 'none']}>
            <IconButton
              variant="ghost"
              aria-label="toggle theme"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="open menu"
                icon={<FiMenu />}
              />
              <MenuList as="nav">
                <Link href="/">
                  <MenuItem as="a">
                    <Heading cursor="pointer" fontSize="24" fontWeight="600">
                      GabrielNBDS
                    </Heading>
                  </MenuItem>
                </Link>

                <Link href="/my-work">
                  <MenuItem as="a">
                    <Button variant="link">My Work</Button>
                  </MenuItem>
                </Link>

                <Link href="/blog">
                  <MenuItem as="a">
                    <Button variant="link">Blog</Button>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Header
