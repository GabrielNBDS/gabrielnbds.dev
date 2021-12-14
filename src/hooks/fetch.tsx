import { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import api from '../services/api'

const fetcher = (url: string) =>
  api.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(res => res.data)

interface IProps {
  children: ReactNode
}

function FetchProvider({ children }: IProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default FetchProvider
