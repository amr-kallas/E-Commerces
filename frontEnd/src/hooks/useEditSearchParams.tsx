import { useSearchParams } from "react-router-dom"

const useEditSearchParams = ({mode='edit'}={}) => {
    const [searchParams,setSearchParams]=useSearchParams()
    const id=searchParams.get('id')??''
    const isActive=mode==searchParams.get('mode')
    const clearSearchParams=()=>{
        searchParams.delete('id')
        searchParams.delete('mode')
        setSearchParams(searchParams)
    }
    return {id,isActive,clearSearchParams}
}

export default useEditSearchParams