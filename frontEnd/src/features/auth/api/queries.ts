import { useMutation } from "@tanstack/react-query";
import API from "./api";

export const queries={
    useSignup:()=>useMutation(API.signup),
    useLogin:()=>useMutation(API.login)
}