import React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';

const StyledSpeedDial = {
  position: 'absolute',
  bottom: 22,
  right: 158,
  color: 'black',
  '& .css-1i5alow-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab':
    {
      bgcolor: '#22252b',
      color: '#7b8088',
      '& :hover': {
        bgcolor: '#22252b',
        color: '#7b8088',
      },
    },
};

const AddButton = ({ handleAddAlarm }) => (
  <>
    <SpeedDial
      onClick={() => handleAddAlarm()}
      ariaLabel='SpeedDial'
      sx={StyledSpeedDial}
      icon={<SpeedDialIcon openIcon={<EditIcon />} />}
    ></SpeedDial>
  </>
);

export default AddButton;
