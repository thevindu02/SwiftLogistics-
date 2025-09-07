// TopNavbar.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Orders', path: '/orders' },
  { label: 'Tracking', path: '/tracking' },
  { label: 'Support', path: '/support' },
];


export default function TopNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navBackground, setNavBackground] = useState('transparent');

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 50 ? COLORS.darkBlue : 'transparent');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const Logo = () => (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        fontFamily: "'Poppins', sans-serif",
        userSelect: 'none',
        cursor: 'pointer',
        color: 'inherit',
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span style={{ color: COLORS.orange }}>Swift</span>
      <span style={{ color: COLORS.blue }}>Logistics</span>
    </Typography>
  );

  const drawerList = (
    <Box
      sx={{ width: 250, bgcolor: COLORS.lightGrey, height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItemButton key={label} onClick={() => navigate(path)} sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1.1rem',
                color: COLORS.darkBlue,
              }}
            />
          </ListItemButton>
        ))}
        <Box sx={{ mt: 2, px: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{
              mb: 1,
              borderRadius: '20px',
              fontWeight: '600',
              textTransform: 'none',
              borderColor: COLORS.darkBlue,
              color: COLORS.darkBlue,
              '&:hover': {
                backgroundColor: COLORS.blue,
                borderColor: COLORS.blue,
                color: '#fff',
              },
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: '20px', fontWeight: '600', textTransform: 'none' }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: '#fff',
          px: 3,
          py: 1,
          boxShadow: '0 2px 8px rgba(0,27,183,0.08)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo />
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {navLinks.map(({ label, path }) => (
                <Button
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{
                    color: COLORS.blue,
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    borderRadius: 2,
                    textTransform: 'none',
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: COLORS.lightGrey,
                      color: COLORS.darkBlue,
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}
          {isMobile ? (
            <>
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} size="large">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: COLORS.blue,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(0,70,255,0.08)',
                  border: 'none',
                  '&:hover': {
                    bgcolor: COLORS.darkBlue,
                    color: '#fff',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: COLORS.blue,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(0,70,255,0.08)',
                  '&:hover': {
                    bgcolor: COLORS.darkBlue,
                    color: '#fff',
                  },
                }}
                onClick={() => navigate('/register')} 
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* spacer for fixed AppBar */}
    </>
  );
}
