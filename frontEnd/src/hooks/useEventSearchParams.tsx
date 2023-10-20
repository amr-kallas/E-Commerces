import { useSearchParams } from "react-router-dom"

const useEventSearchParams = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const edit=(id:string)=>{
        searchParams.set('id',id)
        searchParams.set('mode','edit')
        setSearchParams(searchParams)
    }
  return {edit}
}

export default useEventSearchParams