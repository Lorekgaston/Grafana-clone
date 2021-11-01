import React from 'react';
import { Box } from '@mui/system';

const styledDashboard = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'auto',
};

const Dashboard = () => (
  <Box component='section' sx={styledDashboard}>
    {/* Cards */}
  </Box>
);

export default Dashboard;
