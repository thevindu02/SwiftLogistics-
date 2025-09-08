import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Home, ListAlt, LocalShipping, Message, Report, SupportAgent, AccountCircle, Settings } from '@mui/icons-material';

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

const sidebarLinks = [
  { label: 'Home', icon: <Home />, active: true },
  { label: 'Orders', icon: <ListAlt /> },
  { label: 'Shipment', icon: <LocalShipping /> },
  { label: 'Message', icon: <Message /> },
  { label: 'Report', icon: <Report /> },
  { label: 'Support', icon: <SupportAgent /> },
  { label: 'Account', icon: <AccountCircle /> },
  { label: 'Settings', icon: <Settings /> },
];

export default function Sidebar() {
  return (
    <Box sx={{
      width: { xs: 70, md: 220 },
      bgcolor: COLORS.darkBlue,
      color: '#fff',
      py: 4,
      px: { xs: 1, md: 2 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: { xs: 'center', md: 'flex-start' },
      minHeight: '100vh',
      boxShadow: '2px 0 12px rgba(0,27,183,0.08)',
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, fontFamily: 'Poppins', letterSpacing: 1 }}>
        <span style={{ color: COLORS.orange }}>Swift</span><span style={{ color: COLORS.blue }}>Logistics</span>
      </Typography>
      {sidebarLinks.map(link => (
        <Button
          key={link.label}
          startIcon={link.icon}
          sx={{
            justifyContent: 'flex-start',
            color: link.active ? COLORS.orange : '#fff',
            bgcolor: link.active ? COLORS.lightGrey : 'transparent',
            fontWeight: link.active ? 700 : 500,
            fontFamily: 'Poppins',
            mb: 1,
            borderRadius: 2,
            px: 2,
            py: 1.2,
            minWidth: '100%',
            textTransform: 'none',
            fontSize: { xs: '0.8rem', md: '1rem' },
            '&:hover': {
              bgcolor: COLORS.blue,
              color: '#fff',
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  );
}
