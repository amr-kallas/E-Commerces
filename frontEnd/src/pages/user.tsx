import { Box } from "@mui/material"
import { EditForm, UserTable } from "../features/user"

const User = () => {
  return (
    <Box>
        <UserTable/>
        <EditForm/>
    </Box>
  )
}

export default User