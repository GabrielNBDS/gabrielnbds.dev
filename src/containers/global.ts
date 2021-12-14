import { Container } from 'inversify'
import AuthStore from '../stores/auth'

export default function globalContainer() {
  const authStore = new AuthStore()

  const container = new Container()

  container.bind('AuthStore').toConstantValue(authStore)

  return container
}
