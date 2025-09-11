// TopNavbar.jsx
import React, { useState } from 'react';
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
  { label: 'About Us', path: '/about' },
  { label: 'Exports', path: '/exports' },
  { label: 'Sea Freight', path: '/sea-freight' },
  { label: 'Imports', path: '/imports' },
  { label: 'Support', path: '/support' },
  { label: 'Contact Us', path: '/contact' },
];


export default function TopNavbar({ onSidebarOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

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
      onClick={() => navigate('/')}
    >
      <span style={{ color: COLORS.orange }}>Swift</span>
      <span style={{ color: '#fff' }}>Logistics</span>
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
        <ListItemButton onClick={() => navigate('/tracking')} sx={{ borderRadius: 1, mb: 1 }}>
          <ListItemText
            primary="Track Shipment"
            primaryTypographyProps={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '1.1rem',
              color: COLORS.blue,
            }}
          />
        </ListItemButton>
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
          bgcolor: '#1e3a5f',
          px: 3,
          py: 1,
          boxShadow: '0 4px 20px rgba(30, 58, 95, 0.15)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Menu Button */}
            {onSidebarOpen && (
              <Button 
                onClick={onSidebarOpen} 
                variant="outlined" 
                sx={{ 
                  mr: 3, 
                  borderRadius: 2,
                  color: '#fff',
                  borderColor: COLORS.orange,
                  '&:hover': {
                    bgcolor: COLORS.orange,
                    borderColor: COLORS.orange,
                    color: '#fff',
                  }
                }}
              >
                <span style={{ fontSize: 18, marginRight: 8 }}>☰</span> MENU
              </Button>
            )}
            
            {/* Company Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: COLORS.orange, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>🚚</Typography>
              </Box>
              <Logo />
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {navLinks.map(({ label, path }) => (
                <Button
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    borderRadius: 2,
                    textTransform: 'none',
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 128, 64, 0.1)',
                      color: COLORS.orange,
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
              
              <Button
                variant="contained"
                sx={{
                  borderRadius: '20px',
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: COLORS.orange,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(255, 128, 64, 0.3)',
                  '&:hover': {
                    bgcolor: '#e6703a',
                  },
                }}
                onClick={() => navigate('/tracking')}
              >
                Track Shipment
              </Button>
            </Box>
          )}
          
          {isMobile ? (
            <>
              <IconButton 
                edge="end" 
                aria-label="menu" 
                onClick={toggleDrawer(true)} 
                size="large"
                sx={{ color: '#fff' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '20px',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: '#fff',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: '#fff',
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
                  bgcolor: COLORS.orange,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(255, 128, 64, 0.3)',
                  '&:hover': {
                    bgcolor: '#e6703a',
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
