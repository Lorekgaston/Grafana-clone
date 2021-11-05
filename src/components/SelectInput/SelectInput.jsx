import React from 'react';

import { Box } from '@mui/system';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const SelectInput = ({
  handleChange,
  name,
  label,
  value,
  options,
}) => {
  return (
    <Box
      component='div'
      sx={{
        mt: 2,
      }}
    >
      <FormControl sx={{ width: '100%' }}>
        <InputLabel color='warning' id={label}>
          {label}
        </InputLabel>
        <Select
          onChange={handleChange}
          variant='filled'
          color='warning'
          name={name}
          placeholder={name}
          value={value ? value : ''}
          required
        >
          {options?.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
