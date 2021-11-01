import React from 'react';

import {
  IconButton,
  ListItem,
  Tooltip,
} from '@mui/material';

const linkStyle = {
  padding: '0.2rem 0.5rem',
  color: '#8d8e9a',
};

const Link = ({ children, name }) => (
  <ListItem sx={linkStyle}>
    <Tooltip title={name} placement='right-end'>
      <IconButton color='inherit'>{children}</IconButton>
    </Tooltip>
  </ListItem>
);

export default Link;
