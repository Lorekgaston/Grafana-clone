import React from 'react';

import { Box } from '@mui/system';
import { FormControl, TextField } from '@mui/material';

const TextInput = ({
  handleChandge,
  name,
  label,
  value,
}) => {
  return (
    <Box
      component='div'
      sx={{
        mt: 2,
      }}
    >
      <FormControl>
        <TextField
          label={label}
          variant='filled'
          onChange={handleChandge}
          labelId={label}
          value={value ? value : ''}
          name={name}
          color='warning'
          required
        />
      </FormControl>
    </Box>
  );
};

export default TextInput;
