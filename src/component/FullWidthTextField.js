import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField({onChange}) {

  return (
    <Box
      sx={{
        width: 800,
        maxWidth: '100%',
        borderRadius:'18px',
      }}>
      <TextField fullWidth label="Search meeting name" id="fullWidth" onChange={e => {
        if (onChange){
            onChange(e.target.value);
        }
      }} />
    </Box>
  );
}