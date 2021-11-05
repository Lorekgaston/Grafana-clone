import React from 'react';

import {
  Card as MaterialCard,
  CardContent,
} from '@mui/material';

import Loader from '../Loader/Loader';

const cardStyle = {
  p: 2,
  m: 2,
  bgcolor: '#181b1f',
  border: '1px solid #3a3f48',
  color: '#7b8088',
  textAlign: 'center',
};

const Card = ({ children, isLoading }) => (
  <MaterialCard sx={cardStyle}>
    <CardContent>
      {isLoading ? <Loader /> : children}
    </CardContent>
  </MaterialCard>
);

export default Card;
