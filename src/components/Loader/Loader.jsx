import React from 'react';

import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

const stledLoader = {
  p: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Loader = ({ theme = 'warning' }) => {
  return (
    <Box sx={stledLoader} component='section'>
      <CircularProgress size={25} color={theme} />
    </Box>
  );
};

export default Loader;
