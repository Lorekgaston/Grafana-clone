import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const styledNotFound = {
  margin: '14% auto',
  color: '#7b8088',
  textAlign: 'center',
};

const NotFound = () => {
  return (
    <Box sx={styledNotFound}>
      <Typography variant='h1'>404</Typography>
      <Typography variant='h5'>Page Not Found</Typography>
    </Box>
  );
};

export default NotFound;
