import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Toolbar, Stack,IconButton,Typography } from '@mui/material'
import UserMenu from './UserMenu'
const drawerWidth = 240
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
interface AppBarDialog {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: theme.zIndex.drawer - 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
const Appbar = ({ open, setOpen }: AppBarDialog) => {
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Stack>
        <UserMenu/>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
