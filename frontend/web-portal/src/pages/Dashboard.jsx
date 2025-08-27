import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';

// Sample data - you will replace with API calls
const stats = {
  totalOrders: 1450,
  pendingDeliveries: 120,
  completedDeliveries: 1300,
  failedDeliveries: 30,
};

const recentOrders = [
  { id: 'ORD1234', date: '2025-08-25', status: 'Pending', destination: 'Colombo', actions: 'View' },
  { id: 'ORD1235', date: '2025-08-24', status: 'Delivered', destination: 'Kandy', actions: 'View' },
  { id: 'ORD1236', date: '2025-08-24', status: 'Failed', destination: 'Galle', actions: 'View' },
  { id: 'ORD1237', date: '2025-08-23', status: 'Pending', destination: 'Negombo', actions: 'View' },
  { id: 'ORD1238', date: '2025-08-22', status: 'Delivered', destination: 'Kurunegala', actions: 'View' },
];

const navItems = [
  { label: 'Dashboard', link: '#' },
  { label: 'Orders', link: '#' },
  { label: 'Tracking', link: '#' },
  { label: 'Profile', link: '#' },
];

export default function Dashboard() {
  const theme = useTheme();
  // Anchor for user menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Search state
  const [trackOrderId, setTrackOrderId] = useState('');

  // Replace with API hooks and websocket hooks here
  useEffect(() => {
    // Connect to websocket for real-time updates here
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: theme.palette.background.default }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="fixed" color="primary" elevation={3} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo192.png" alt="SwiftLogistics" style={{ width: 40, marginRight: 10, borderRadius: 8 }} />
            <Typography variant="h6" noWrap component="div">
              SwiftLogistics
            </Typography>
          </Box>

          {/* Navigation Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navItems.map(item => (
              <Button key={item.label} sx={{ color: 'white', fontWeight: '600' }} href={item.link}>
                {item.label}
              </Button>
            ))}
          </Box>

          {/* User Info */}
          <Box>
            <IconButton color="inherit" onClick={handleMenu} size="large">
              <Avatar alt="User Name" src="/user-avatar.png" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>
                Logout <LogoutIcon fontSize="small" sx={{ ml: 1 }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, overflowY: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Dashboard Overview
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { label: 'Total Orders', value: stats.totalOrders, color: theme.palette.primary.main },
            { label: 'Pending Deliveries', value: stats.pendingDeliveries, color: theme.palette.primary.light },
            { label: 'Completed Deliveries', value: stats.completedDeliveries, color: '#4caf50' /*green*/ },
            { label: 'Failed Deliveries', value: stats.failedDeliveries, color: theme.palette.secondary.main },
          ].map(stat => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="subtitle1" sx={{ color: stat.color, fontWeight: 700 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Actions: Submit Order, Track Order */}
        <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0, 27, 183, 0.3)' }}
              onClick={() => alert('Navigate to Submit Order')}
            >
              Submit New Order
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Track Order by ID"
              value={trackOrderId}
              onChange={e => setTrackOrderId(e.target.value)}
              size="large"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search order"
                      onClick={() => alert(`Searching order ${trackOrderId}`)}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 3, backgroundColor: 'white' }}
              inputProps={{ 'aria-label': 'track order' }}
            />
          </Grid>
        </Grid>

        {/* Recent Orders Table */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Orders
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Order ID', 'Date', 'Status', 'Destination', 'Actions'].map(head => (
                  <TableCell key={head} sx={{ fontWeight: '700' }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map(order => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      badgeContent={order.status}
                      color={
                        order.status === 'Delivered'
                          ? 'success'
                          : order.status === 'Failed'
                          ? 'error'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell>{order.destination}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => alert(`Viewing ${order.id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Real-time Notifications Panel */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Real-time Notifications
          </Typography>
          <Paper
            sx={{
              height: 200,
              overflowY: 'auto',
              p: 2,
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <List>
              <ListItem>
                <ListItemText
                  primary="Order ORD1234 has been shipped."
                  secondary="2 minutes ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Route update: New high-priority delivery added to your route."
                  secondary="10 minutes ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="System maintenance planned for Sept 1, 2025."
                  secondary="1 day ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
