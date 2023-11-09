import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiDrawer from '@mui/material/Drawer'
import { NavLink, useLocation } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import { Drawer, Typography } from '@mui/material'
import { queries } from '../../user/api/queries'
interface AppBarDialog {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const PermanentDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
const items = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    path: '/',
    role: ['1995', '1996', '1999', '2001'],
  },
  {
    text: 'Users',
    icon: <PersonIcon />,
    path: '/users',
    role: ['1995'],
  },

  {
    text: 'Writter',
    icon: <ImportContactsIcon />,
    path: '/writter',
    role: ['1995', '1996'],
  },
  {
    text: 'Category',
    icon: <ProductionQuantityLimitsIcon />,
    path: '/category',
    role: ['1995', '1999'],
  },
]

const Sidebar = ({ open, setOpen }: AppBarDialog) => {
  const me = queries.useMe()
  const location = useLocation()
  const theme = useTheme()

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const drawerDetail = (
    <>
      <DrawerHeader>
        <Typography
          sx={{
            flex: 1,
            textAlign: 'center',
            color: '#0b90dc',
            fontSize: 22,
            fontWeight: 'bold',
          }}
        >
          E-Commerce
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        sx={{
          margin: open ? '0 10px' : '0',
        }}
      >
        {items.map(
          (item) =>
            item.role.includes(me.data?.role) && (
              <NavLink
                to={item.path}
                style={{ textDecoration: 'none', color: '#8282ad' }}
                key={item.text}
              >
                <ListItem
                  disablePadding
                  sx={{
                    display: 'block',
                    '.Mui-selected': {
                      bgcolor: '#f3f2fe',
                      '.MuiListItemIcon-root': {
                        color: '#0b90dc',
                      },
                      '.MuiTypography-root': {
                        color: '#0b90dc',
                      },
                    },
                  }}
                >
                  <ListItemButton
                    selected={location.pathname == item.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      borderRadius: '6px',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: open ? 1 : 0,
                        fontSize: 15,
                        textTransform: 'capitalize',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            )
        )}
      </List>
    </>
  )
  return (
    <>
      <PermanentDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        open={open}
      >
        {drawerDetail}
      </PermanentDrawer>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '.MuiDrawer-paper': {
            width: 240,
          },
        }}
      >
        {drawerDetail}
      </Drawer>
    </>
  )
}

export default Sidebar
