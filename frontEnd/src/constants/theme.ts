import { createTheme } from "@mui/material";

const theme=(language:string)=>createTheme({
    direction:language=='en'?'ltr':'rtl',
})
export default theme