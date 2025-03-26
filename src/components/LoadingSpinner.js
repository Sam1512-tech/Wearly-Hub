import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;