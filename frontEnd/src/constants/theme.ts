import { createTheme } from "@mui/material";

const theme=(language:string)=>createTheme({
    direction:language=='ar'?'rtl':'ltr',
})
export default theme