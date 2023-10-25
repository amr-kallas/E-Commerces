import { Box } from "@mui/material"
import { EditForm, UserTable } from "../features/user"
import TopBarSlider from "../components/feedback/TopBarSlider"

const User = () => {
  return (
    <Box>
      <TopBarSlider/>
        <UserTable/>
        <EditForm/>
    </Box>
  )
}

export default User