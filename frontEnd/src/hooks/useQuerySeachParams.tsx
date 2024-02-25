import { useSearchParams } from 'react-router-dom'

const useQuerySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const date = searchParams.get('date') ?? ''
  console.log({ q })
  console.log({ date })
  const clearSearchParams = () => {
    if (!q) {
      searchParams.delete('q')
    }
    if (!date) {
      searchParams.delete('date')
    }
    setSearchParams(searchParams)
  }
  return { q, date, clearSearchParams }
}

export default useQuerySearchParams
