import React from 'react';

import { Box } from '@mui/system';
import {
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const styledListItem = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr) auto',
  mb: 1,
  bgcolor: '#22252b',
};
const styledButton = { ml: 1, minWidth: '95px' };

const Alarm = ({
  id,
  name,
  source,
  metrics,
  trigger,
  paused,
}) => (
  <ListItem sx={styledListItem}>
    <ListItemText>{name}</ListItemText>
    <ListItemText>{source}</ListItemText>
    <ListItemText>
      {metrics[Math.floor(Math.random() * 3)]}
    </ListItemText>
    <ListItemText>{trigger}%</ListItemText>
    <ListItemText>
      {!paused ? 'Paused' : 'Active'}
    </ListItemText>
    <Box component='div'>
      <Button
        variant='outlined'
        color='primary'
        sx={styledButton}
      >
        Edit
      </Button>
      <Button
        variant='outlined'
        color='error'
        sx={styledButton}
      >
        Delete
      </Button>
      <Button
        variant='outlined'
        color='warning'
        sx={styledButton}
      >
        {!paused ? 'Resume' : 'Pause'}
      </Button>
    </Box>
  </ListItem>
);

export default Alarm;
