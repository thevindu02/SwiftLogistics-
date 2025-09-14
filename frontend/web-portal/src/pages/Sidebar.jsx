// Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AddCircle as NewOrderIcon,
  ListAlt as MyOrdersIcon,
  Search as TrackingIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'New Order', icon: <NewOrderIcon />, path: '/submit-order' },
  { label: 'My Orders', icon: <MyOrdersIcon />, path: '/order-list' },
  { label: 'Tracking', icon: <TrackingIcon />, path: '/tracking' },
  { label: 'Profile', icon: <ProfileIcon />, path: '/profile' },
];

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleSignOut = () => {
    // Implement your sign-out logic here
    // e.g., clear auth tokens, redirect to login
    navigate('/login');
    if (onClose) onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} PaperProps={{sx: {width: 260}}}>
      <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', userSelect: 'none' }}>
          <span style={{ color: '#FF8040' }}>Swift</span>
          <span style={{ color: '#0046FF' }}>Logistics</span>
        </Typography>
      </Box>
      <List>
        {navItems.map(({ label, icon, path }) => (
          <ListItemButton
            key={label}
            selected={location.pathname === path}
            onClick={() => handleNavigation(path)}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&.Mui-selected': {
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                '& svg': { color: theme.palette.primary.contrastText },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ px: 3, py: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          fullWidth
          onClick={handleSignOut}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
}
