let API_ROUTES={
    SIGN:{
        root:'',
        REGISTER:'register',
        LOGIN:'login',
        GOOGLE:'auth/google/callback'
    },
    USERS:{
        root:'',
        ALL:'users',
        ME:'user',
        LOGOUT:'logout',
        GET:(id:string)=>`user/${id}`,
        EDIT:(id:string)=>`user/edit/${id}`,
        DELETE:(id:string)=>`user/${id}`,
        ADD:'user/add'

    }
}
export default API_ROUTES