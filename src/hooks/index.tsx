import { Provider } from 'inversify-react'
import globalContainer from '../containers/global'
import FetchProvider from './fetch'

const AppProvider: React.FC = ({ children }) => (
  <Provider container={globalContainer}>
    <FetchProvider>{children}</FetchProvider>
  </Provider>
)

export default AppProvider
