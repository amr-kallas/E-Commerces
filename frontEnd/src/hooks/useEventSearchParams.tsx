import { useSearchParams } from 'react-router-dom'

const useEventSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const edit = (id: string) => {
    searchParams.set('id', id)
    searchParams.set('mode', 'edit')
    setSearchParams(searchParams)
  }
  const add = () => {
    searchParams.set('mode', 'add')
    setSearchParams(searchParams)
  }
  return { edit, add }
}

export default useEventSearchParams
