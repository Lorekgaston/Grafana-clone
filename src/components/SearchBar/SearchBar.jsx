import { Input } from '@mui/material';
import React from 'react';

const SearchBar = ({
  value,
  handleChange,
  placeholder,
}) => (
  <Input
    autoComplete='off'
    id='name-filter'
    label='Name Filter'
    color='warning'
    size='medium'
    placeholder={placeholder}
    value={value}
    onChange={(e) => handleChange(e)}
    sx={{
      ml: 4,
      bgcolor: '#7b8088',
      fontSize: '0.75rem',
    }}
  />
);

export default SearchBar;
