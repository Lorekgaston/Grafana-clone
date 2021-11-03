import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Badge from '../../components/Badge/Badge';
import { useGlobalState } from '../../context/alarmscontext';

const styledToolbar = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  bgcolor: '#181b1f',
};

const TopBar = () => {
  const [state] = useGlobalState();
  return (
    <AppBar elevation={0}>
      <Toolbar sx={styledToolbar}>
        <Badge count={state.activeAlarmsCount} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
