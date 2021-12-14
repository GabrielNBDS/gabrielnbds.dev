import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  HStack,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useEffect, ChangeEvent } from 'react'
import { FiEdit, FiMoon, FiPower, FiSun, FiX } from 'react-icons/fi'
import Container from '../../components/Container'
import withAuth from '../../components/withAuth'
import api from '../../services/api'
import AuthStore from '../../stores/auth'
import getAvatar from '../../utils/getAvatar'

const Profile = () => {
  const { user, getUserData, signOut } = useInjection<AuthStore>('AuthStore')
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()

  useEffect(() => {
    getUserData()
  }, [])

  async function addAvatar(e: ChangeEvent<HTMLInputElement>) {
    try {
      const avatar = e.target.files[0]

      const data = new FormData()

      data.append('avatar', avatar)

      await api.post('/users/add-avatar', data)

      getUserData()

      toast({ title: 'Avatar changed', duration: 1500, status: 'success' })
    } catch (error) {
      const { message } = error.response.data.errors[0]
      toast({
        title: message,
        duration: 5000,
        status: 'error',
        isClosable: true,
      })
    }
  }

  async function removeAvatar() {
    await api.delete('/users/remove-avatar')

    getUserData()

    toast({ title: 'Avatar removed', duration: 1500, status: 'success' })
  }

  return (
    <Container>
      <HStack justify="space-between">
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Your Profile
        </Heading>

        <IconButton
          borderRadius="full"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          aria-label="toggle theme"
        />
      </HStack>

      <FormControl id="userName">
        <FormLabel>User Avatar</FormLabel>
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar
              name={user.name}
              src={getAvatar(user?.avatar?.url)}
              size="xl"
            >
              {getAvatar(user?.avatar?.url) && (
                <AvatarBadge
                  onClick={removeAvatar}
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<FiX />}
                />
              )}
            </Avatar>
          </Center>
          <Center w="full">
            <Button as="label" cursor="pointer" colorScheme="blue" w="full">
              Change Avatar
              <input
                onClick={e => {
                  ;(e.target as HTMLInputElement).value = null
                }}
                onChange={addAvatar}
                type="file"
                style={{ display: 'none' }}
              />
            </Button>
          </Center>
        </Stack>
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Name</FormLabel>
        <Input value={user.name} />
      </FormControl>

      <FormControl isReadOnly>
        <FormLabel>Email</FormLabel>
        <Input value={user.email} type="email" />
      </FormControl>

      <Link href="/profile/edit">
        <Button
          as="a"
          cursor="pointer"
          colorScheme="blue"
          rightIcon={<FiEdit />}
        >
          Edit
        </Button>
      </Link>

      <Button onClick={signOut} colorScheme="red" rightIcon={<FiPower />}>
        Logout
      </Button>
    </Container>
  )
}

export default withAuth(observer(Profile))
