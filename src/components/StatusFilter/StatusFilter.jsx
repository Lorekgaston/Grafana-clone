import React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const status = [
  { name: 'running', value: true },
  { name: 'paused', value: '' },
];

const iconButtonStyle = {
  color: '#7b8088',
  '&.Mui-selected': { color: '#ED6C02' },
};
const StyledGroup = {
  bgcolor: '#22252b',
  height: 30,
};

const StatusFilter = ({ alignment, handleChange }) => (
  <ToggleButtonGroup
    sx={StyledGroup}
    value={alignment}
    exclusive
    onChange={handleChange}
  >
    {status.map(({ name, value }, idx) => (
      <ToggleButton
        key={idx}
        size='medium'
        sx={iconButtonStyle}
        value={value}
      >
        {name}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default StatusFilter;
