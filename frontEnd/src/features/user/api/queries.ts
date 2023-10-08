import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { useQuery } from "@tanstack/react-query";

export const keys=createQueryKeys('users',{
    users:{
        queryFn:API.get,
        queryKey:['']
    }
})
export const queries={
    useUsers:()=>{useQuery(keys.users)}
}