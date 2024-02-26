import { Box, Button, ListItemIcon, Menu, MenuItem } from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import { queries } from '@features/user/api/queries'
import { useState } from 'react'
import logout from '@features/user/components/Logout'

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data, isLoading } = queries.useMe()
  const {LogoutUser}= logout()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          bgcolor: '#498fdf',
          color: 'white',
          textTransform: 'capitalize',
          '&:hover': {
            bgcolor: '#498fdf',
          },
        }}
      >
        {!isLoading && data!.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={LogoutUser} sx={{
            color:'red'
        }}>
          <ListItemIcon sx={{color:'#ff0000c2'}}>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu
