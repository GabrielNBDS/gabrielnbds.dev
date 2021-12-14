import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FiHome, FiMenu, FiSearch } from 'react-icons/fi'
import React from 'react'
import Link from 'next/link'
import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../stores/auth'
import getAvatar from '../../utils/getAvatar'

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link href={href}>
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue('inherit', 'gray.400')}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.900'),
          color: useColorModeValue('gray.900', 'gray.200'),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: useColorModeValue('gray.600', 'gray.300'),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

const SidebarContent = props => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue('white', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Heading as="h1">Daedalus</Heading>
    </Flex>
    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      color="gray.600"
      aria-label="Main Navigation"
    >
      <NavItem href="/" icon={FiHome}>
        Home
      </NavItem>
    </Flex>
  </Box>
)

const Sidebar = ({ children }) => {
  const sidebar = useDisclosure()
  const { user } = useInjection<AuthStore>('AuthStore')

  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue('white', 'gray.800')}
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search" />
          </InputGroup>

          <Flex align="center">
            {user && (
              <Link href="/profile">
                <Avatar
                  src={getAvatar(user?.avatar?.url)}
                  ml="4"
                  size="sm"
                  cursor="pointer"
                />
              </Link>
            )}

            {!user && (
              <HStack spacing={4}>
                <Link href="/login">
                  <Button size="sm" colorScheme="blue" as="a" cursor="pointer">
                    Login
                  </Button>
                </Link>

                <Link href="/create-account">
                  <Button size="sm" variant="link" as="a" cursor="pointer">
                    Sign Up
                  </Button>
                </Link>
              </HStack>
            )}
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default observer(Sidebar)
