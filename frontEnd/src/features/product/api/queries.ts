import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const keys=createQueryKeys('product',{
    getAll:{
        queryFn:API.getAll,
        queryKey:['']
    },
    get:(id:string)=>({
        queryFn:()=>API.get(id),
        queryKey:['']
    })
})

export const queries={
    useAll:()=>useQuery(keys.getAll),
    useProduct:(id:string)=>useQuery({...keys.get(id),enabled:!!id}),
    useAdd:()=>useMutation(API.Add),
    useAddImg:()=>useMutation(API.AddImg),
    useEdit:()=>useMutation(API.Edit),
    useDelete:()=>useMutation(API.Delete),
    useDeleteImg:()=>useMutation(API.DeleteImg),
}