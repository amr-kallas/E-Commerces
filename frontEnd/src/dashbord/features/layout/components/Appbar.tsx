import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
  Toolbar,
  Stack,
  IconButton,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import UserMenu from './UserMenu'
import { changeLanguage } from '@lib/i18n'
import { useTranslation } from 'react-i18next'
import { useLanguageContext } from '@context/LanguageContext'
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
  const { t } = useTranslation('layout')
  const { lang, setLang } = useLanguageContext()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value)
    setLang(event.target.value)
  }
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          alignItems: 'center',
        }}
      >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1.5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold', fontSize: 24 }}
          >
            {t('dashbord')}
          </Typography>
        <Stack direction="row" spacing={1.2} alignItems="center" marginLeft='auto'>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Ages"
            size="small"
            value={lang ?? 'en'}
            sx={{
              color: 'white',
              svg: { color: 'white' },
              height: 'fit-content',
              ml: 'auto',
              borderRadius: 6,
              fieldset: { border: 'none' },
            }}
            onChange={handleChange}
          >
            <MenuItem value={'en'}>en</MenuItem>
            <MenuItem value={'ar'}>ar</MenuItem>
          </Select>
          <UserMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
