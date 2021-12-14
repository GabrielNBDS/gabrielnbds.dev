import { FieldValues, UseFormSetError } from 'react-hook-form'

interface Error {
  response?: {
    data?: {
      errors?: {
        field: string
        message: string
      }[]
    }
  }
}

function showFormErrors(err: Error, setError: UseFormSetError<FieldValues>) {
  err?.response?.data?.errors?.forEach(({ field, message }) => {
    setError(field, { message })
  })
}

export default showFormErrors
