import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import AuthStore from '../stores/auth'
import Loader from './Loader'
import Login from './Login'

const AuthListener = observer(({ children }: { children: ReactNode }) => {
  const { user, loading } = useInjection<AuthStore>('AuthStore')

  if (user) {
    return <>{children}</>
  }

  if (!user && !loading) {
    return <Login />
  }

  return <Loader />
})

const withAuth = (Component: () => JSX.Element) => (): JSX.Element => {
  return (
    <AuthListener>
      <Component />
    </AuthListener>
  )
}

export default withAuth
