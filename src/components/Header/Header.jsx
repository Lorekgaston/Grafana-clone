import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const styledTitle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#7b8088',
  mt: 2,
};

const Header = ({ title }) => (
  <Box component='header'>
    <Box component='section'>
      <Typography sx={styledTitle} variant='h1'>
        {title}
      </Typography>
    </Box>
  </Box>
);

export default Header;
