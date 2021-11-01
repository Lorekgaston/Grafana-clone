import React from 'react';

import { Box } from '@mui/system';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import Alarm from '../../components/Alarm/Alarm';

const fakeData = [
  {
    _id: 1,
    name: 'My Alarm',
    source: 'server 1',
    metrics: ['CPU Usage', 'Memory', 'FS Usage'],
    trigger: 80,
    paused: true,
    firing: false,
    normal: true,
  },
  {
    _id: 2,
    name: 'Your Alarm',
    source: 'server 2',
    metrics: ['CPU Usage', 'Memory', 'FS Usage'],
    trigger: 30,
    paused: false,
    firing: true,
    normal: false,
  },
  {
    _id: 3,
    name: 'Our Alarm',
    source: 'server 3',
    metrics: ['CPU Usage', 'Memory', 'FS Usage'],
    trigger: 20,
    paused: true,
    firing: true,
    normal: false,
  },
  {
    _id: 4,
    name: 'new Alarm',
    source: 'server 3',
    metrics: ['CPU Usage', 'Memory', 'FS Usage'],
    trigger: 50,
    paused: true,
    firing: true,
    normal: false,
  },
];

const tableHead = [
  'Name',
  'Source',
  'Metric',
  'Trigger',
  'Status',
  '',
];

const styledTableHead = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 217px) auto',
};
const StyledDivider = {
  bgcolor: '#7b8088',
};

const AlarmList = () => {
  return (
    <>
      <Box component='section'>
        <ListItem sx={styledTableHead}>
          {tableHead.map((item, idx) => (
            <ListItemText key={idx}>
              <Typography variant='h6'>{item}</Typography>
            </ListItemText>
          ))}
        </ListItem>
      </Box>
      <Divider sx={StyledDivider} variant='fullWidth' />
      <Box component='section'>
        <List>
          {fakeData.map(({ _id, ...rest }, idx) => (
            <Alarm key={idx} id={_id} {...rest} />
          ))}
        </List>
      </Box>
    </>
  );
};

export default AlarmList;
