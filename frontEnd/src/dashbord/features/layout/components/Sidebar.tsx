import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  Tooltip,
  Typography,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import FeedIcon from '@mui/icons-material/Feed'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import MuiDrawer from '@mui/material/Drawer'
import { NavLink, useLocation } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import { queries } from '@dashbord/features/user/api/queries'
import { useTranslation } from 'react-i18next'
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

const Sidebar = ({ open, setOpen }: AppBarDialog) => {
  const { t } = useTranslation('layout')
  const me = queries.useMe()
  const location = useLocation()
  const theme = useTheme()

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const items = [
    {
      text: t('home'),
      icon: <HomeIcon />,
      path: '/',
      role: ['1995', '1996', '1999', '2001'],
    },
    {
      text: t('users'),
      icon: <PersonIcon />,
      path: '/users',
      role: ['1995'],
    },
    {
      text: t('category'),
      icon: <ProductionQuantityLimitsIcon />,
      path: '/category',
      role: ['1995', '1999'],
    },
    {
      text: t('product'),
      icon: <FeedIcon />,
      path: '/product',
      role: ['1995', '1999'],
    },
  ]
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
          {t('ecommerce')}
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
            item.role.includes(me.data!.role) && (
              <NavLink
                to={item.path}
                style={{ textDecoration: 'none', color: '#8282ad' }}
                key={item.text}
              >
                <Tooltip
                  title={!open ? item.text : undefined}
                  placement="right-start"
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
                </Tooltip>
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
