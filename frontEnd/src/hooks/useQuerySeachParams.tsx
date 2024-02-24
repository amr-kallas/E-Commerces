import { useSearchParams } from 'react-router-dom'

const useQuerySearchParams = ({key='q'}={}) => {
    const [searchParams,setSearchParams]=useSearchParams()
    const q=searchParams.get(key)??''
    const clearSearchParams=()=>{
        searchParams.delete('q')
        setSearchParams(searchParams)
    }
  return {q,clearSearchParams}
}

export default useQuerySearchParams