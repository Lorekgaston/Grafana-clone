import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Badge from '../Badge/Badge';

const styledToolbar = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  bgcolor: '#181b1f',
};

const TopBar = () => (
  <AppBar elevation={0}>
    <Toolbar sx={styledToolbar}>
      <Badge />
    </Toolbar>
  </AppBar>
);

export default TopBar;
