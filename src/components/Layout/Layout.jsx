import React from 'react';

import { Box } from '@mui/system';

import Menu from '../Menu/Menu';
import TopBar from '../TopBar/TopBar';

const styledLayout = { height: '100vh', display: 'flex' };
const styledMain = {
  background: '#111217',
  marginTop: 6,
  flex: 1,
  padding: 3,
};

const Layout = ({ children }) => (
  <Box sx={styledLayout}>
    <TopBar />
    <Menu />
    <Box component='main' sx={styledMain}>
      {children}
    </Box>
  </Box>
);

export default Layout;
