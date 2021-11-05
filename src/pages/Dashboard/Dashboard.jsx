import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { List, ListItem, Typography } from '@mui/material';

import useAlarmList from '../../hooks/useAlarmList';
import { useGlobalState } from '../../context/alarmscontext';

import Card from '../../components/Card/Card';

const styledDashboard = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'auto',
};

const Dashboard = () => {
  const [state] = useGlobalState();
  const [dashboarState, setDashboardState] = useState({
    url: '',
  });
  const [isLoading] = useAlarmList(dashboarState.url);

  useEffect(
    () =>
      setDashboardState({
        url: `alarms`,
      }),
    []
  );
  return (
    <Box component='section' sx={styledDashboard}>
      <Card isLoading={isLoading}>
        <Typography variant='h5'>
          There are Turned {state.activeAlarmsCount}/
          {state.totalAlarmsCount} On Alarms
        </Typography>
      </Card>
      <Card isLoading={isLoading}>
        <Typography variant='h5'>Whats New</Typography>
        <List>
          <ListItem>
            <Typography variant='h6'>
              0 - New Features in v8.2
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>
              1 - New Features in v8.1
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>
              2 - New Features in v8.0
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>
              3 - New Features in v7.9
            </Typography>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default Dashboard;
