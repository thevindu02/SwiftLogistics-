
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
  cardBg: '#F5F8FF',
};

const stats = {
  totalOrders: 1450,
  pendingDeliveries: 120,
  completedDeliveries: 1300,
  failedDeliveries: 30,
};

const recentOrders = [
  { id: 'ORD1234', date: '2025-08-25', status: 'Pending', destination: 'Colombo' },
  { id: 'ORD1235', date: '2025-08-24', status: 'Delivered', destination: 'Kandy' },
  { id: 'ORD1236', date: '2025-08-24', status: 'Failed', destination: 'Galle' },
  { id: 'ORD1237', date: '2025-08-23', status: 'Pending', destination: 'Negombo' },
  { id: 'ORD1238', date: '2025-08-22', status: 'Delivered', destination: 'Kurunegala' },
];

const notifications = [
  { text: 'Order ORD1234 has been shipped.', time: '2 minutes ago' },
  { text: 'Route update: New high-priority delivery added.', time: '10 minutes ago' },
  { text: 'System maintenance planned for Sept 1, 2025.', time: '1 day ago' },
];


export default function Dashboard() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [trackOrderId, setTrackOrderId] = useState('');




  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Top Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleMenu} size="large" aria-label="user account menu">
          <Avatar alt="User Name" src="/user-avatar.png" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>
            Logout <LogoutIcon fontSize="small" sx={{ ml: 1 }} />
          </MenuItem>
        </Menu>
      </Box>

      {/* Dashboard Title */}
      <Typography variant="h3" sx={{ fontWeight: 800, color: COLORS.darkBlue, mb: 2, fontFamily: 'Poppins', letterSpacing: 1 }}>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="subtitle1" sx={{ color: COLORS.blue, mb: 3 }}>
        Get a quick overview of your logistics operations, orders, and notifications.
      </Typography>

      <Grid container spacing={4}>
        {/* Stats Big Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 4, bgcolor: COLORS.cardBg, boxShadow: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.darkBlue, mb: 3 }}>
              Order Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: COLORS.blue, textAlign: 'center', color: '#fff', boxShadow: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Total Orders</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>{stats.totalOrders}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: COLORS.orange, textAlign: 'center', color: '#fff', boxShadow: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Pending</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>{stats.pendingDeliveries}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#4caf50', textAlign: 'center', color: '#fff', boxShadow: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Completed</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>{stats.completedDeliveries}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.error.main, textAlign: 'center', color: '#fff', boxShadow: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Failed</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 900 }}>{stats.failedDeliveries}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={4}>
            {/* Track Order Big Card */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', boxShadow: 2, height: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.blue, mb: 2 }}>
                  Track Your Order
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.darkBlue, mb: 2 }}>
                  Enter your order ID below to get the latest status and location.
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  placeholder="Enter Order ID"
                  value={trackOrderId}
                  onChange={(e) => setTrackOrderId(e.target.value)}
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
                  sx={{ bgcolor: COLORS.lightGrey, borderRadius: 2, mb: 2 }}
                  inputProps={{ 'aria-label': 'track order' }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>
                    <b>Current Location:</b> Colombo Hub
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>
                    <b>Estimated Delivery:</b> 2 days
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Package Details Big Card */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', boxShadow: 2, height: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.blue, mb: 2 }}>
                  Package Details
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.darkBlue, mb: 2 }}>
                  Breakdown of your shipped items by category.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>Electronics</Typography>
                    <Typography variant="h4" sx={{ color: COLORS.orange, fontWeight: 800 }}>67%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>Fashion</Typography>
                    <Typography variant="h4" sx={{ color: COLORS.blue, fontWeight: 800 }}>43%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>Detergent</Typography>
                    <Typography variant="h4" sx={{ color: COLORS.blue, fontWeight: 800 }}>24%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>Other</Typography>
                    <Typography variant="h4" sx={{ color: COLORS.lightGrey, fontWeight: 800 }}>12%</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Notifications Big Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, bgcolor: COLORS.cardBg, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.darkBlue, mb: 3 }}>
              Notifications
            </Typography>
            <List>
              {notifications.map((note, idx) => (
                <ListItem key={idx} sx={{ py: 2 }}>
                  <ListItemText
                    primary={<Typography variant="body1" sx={{ color: COLORS.blue }}>{note.text}</Typography>}
                    secondary={<Typography variant="body2" sx={{ color: COLORS.darkBlue }}>{note.time}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

