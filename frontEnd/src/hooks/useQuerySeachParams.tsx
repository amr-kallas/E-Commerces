import { useSearchParams } from 'react-router-dom'

const useQuerySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const setQueryParam = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }
  const q = searchParams.get('q') ?? ''
  const date = searchParams.get('date') ?? ''

  return { setQueryParam, q, date }
}

export default useQuerySearchParams
