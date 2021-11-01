import React from 'react';
import { Box } from '@mui/system';
import AlarmList from '../../containers/AlarmList/AlarmList';

const styledAlarms = {
  background: '#181b1f',
  minHeight: '75vh',
  padding: '1.5rem 1rem',
  border: '1px solid #3a3f48',
  borderRadius: '5px',
  mb: 6,
};

const Alarms = () => (
  <Box sx={styledAlarms} component='section'>
    {/* Filters */}
    <AlarmList />
  </Box>
);

export default Alarms;
