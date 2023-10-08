import axios from "axios"
import { queries } from "./api/queries"
import { useEffect } from "react"

const Users = () => {
  // const users=queries.useUsers()
  // console.log(users)
  // const res=axios.get("http://127.0.0.1:8000/api/users").then(res=>console.log(res))
  useEffect(()=>{
    const a=async ()=>{
      try{
        const res=await axios.get("http://127.0.0.1:8000/api/users")
        console.log(res)
      }
      catch(err){
        console.log(err)
      }
    }
    a()
  },[])
  return (
    <div>index</div>
  )
}

export default Users