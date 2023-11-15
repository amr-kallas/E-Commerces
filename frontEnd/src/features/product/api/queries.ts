import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const keys=createQueryKeys('product',{
    getAll:{
        queryFn:API.getAll,
        queryKey:['']
    }
})

export const queries={
    useAll:()=>useQuery(keys.getAll),
    useAdd:()=>useMutation(API.Add),
    useEdit:()=>useMutation(API.Edit),
    useDelete:()=>useMutation(API.Delete),
}