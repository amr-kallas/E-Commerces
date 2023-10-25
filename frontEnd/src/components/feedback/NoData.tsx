import ErrorIcon from "@mui/icons-material/Error";
import { Stack, Typography, useTheme } from "@mui/material";

const NoData = () => {
    const theme=useTheme()
  return (
    <Stack sx={{
        justifyContent:'center',
        alignItems:'center',
        width:1,
        py:7,
        color:theme.palette.primary.main
    }}>
        <ErrorIcon  sx={{fontSize:'10.5rem'}}/>
        <Typography variant="h5" sx={{
            fontSize:'2rem',
            fontWeight:'bold',
            pt:2
        }}>No Users Found</Typography>
    </Stack>
  )
}

export default NoData