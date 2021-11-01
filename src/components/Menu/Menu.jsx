import React from 'react';

import { Drawer, List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Link from '../Link/Link';

const styledDrawer = {
  width: 70,
  height: 'calc(100% - 65px)',
  '& .MuiDrawer-paper': {
    width: 70,
    height: 'calc(100% - 65px)',
    bgcolor: '#181b1f',
  },
};

const Menu = () => (
  <Drawer
    sx={styledDrawer}
    variant='permanent'
    anchor='bottom'
  >
    <List>
      <Link path={'/'} name='Dashboard'>
        <DashboardIcon fontSize='large' />
      </Link>
      <Link path={'/alarms'} name='Alarms'>
        <NotificationsIcon fontSize='large' />
      </Link>
    </List>
  </Drawer>
);

export default Menu;
