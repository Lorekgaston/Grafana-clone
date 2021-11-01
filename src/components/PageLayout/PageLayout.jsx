import React from 'react';
import { Box } from '@mui/system';

import Header from '../Header/Header';

const styledPage = {
  maxWidth: '1460px',
  margin: '0 auto',
  color: '#7b8088',
};

const PageLayout = ({ children, title }) => (
  <Box sx={styledPage}>
    <Header title={title} />
    <Box component='main'>{children}</Box>
  </Box>
);

export default PageLayout;
