import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../static/style/home.css';

export default function FloatingActionButton({handleAction}) {
  return (
    <Box className="fab-btn" sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab onClick={handleAction} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}