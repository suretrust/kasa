import { useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  ListItem,
  Drawer,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  List
} from '@mui/material'
import { Box, useTheme } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router'

import { routes } from '../../routes'

const drawerWidth = 260

const LayoutHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleNavItemClick = path => {
    handleDrawerToggle()
    if (location.pathname === path) return

    navigate(path)
  }

  const drawer = (
    <Box>
      <Toolbar />
      <Divider sx={{ mb: 2 }} />
      <List>
        {routes.map(route => {
          const { name, icon: RouteIcon, path } = route

          return (
            <ListItem
              button
              data-testid='nav-item'
              key={`${name}-${path}`}
              onClick={() => handleNavItemClick(path)}
              sx={{ pl: { xs: 3, sm: 5 }, color: 'white' }}
            >
              <ListItemIcon>
                <RouteIcon color='secondary' />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <div data-testid='layout-header'>
      <AppBar position='fixed' color='secondary' sx={{ zIndex: 99999 }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' }, ml: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            p={2}
            variant='h4'
            component='div'
            sx={{ flexGrow: 1, fontWeight: 800, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            KASA
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: 'red'
        }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            marginTop: '40px',
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            marginTop: '40px',
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  )
}

export default LayoutHeader
