export type userBody={
    name:string,
    email:string,
    password:string
}
export type loginBody={
    email:string,
    password:string
}
export type AuthBody={
    token:string,
    user:{
        name:string,
        email:string,
        role:string,
    }
}