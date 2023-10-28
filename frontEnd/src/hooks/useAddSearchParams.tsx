import { useSearchParams } from 'react-router-dom'

const useAddSearchParams = ({mode='add'}={}) => {
    const [searchParams,setSearchParams]=useSearchParams()
    const isActive=mode==searchParams.get('mode')
    const clearSearchParams=()=>{
        searchParams.delete('mode')
        setSearchParams(searchParams)
    }
  return {isActive,clearSearchParams}
}

export default useAddSearchParams