// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Crypto Comparator. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;