import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

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

export default function Dashboard() {
  const theme = useTheme();

  // User menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Track order input
  const [trackOrderId, setTrackOrderId] = useState('');

  // Navigation
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
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

      {/* Main content container */}
      <Box sx={{ flexGrow: 1, p: 3, maxWidth: 1200, mx: 'auto' }}>
        {/* Stats cards */}
        <Grid container spacing={3} mb={4}>
          {[
            { label: 'Total Orders', value: stats.totalOrders, color: theme.palette.primary.main },
            { label: 'Pending Deliveries', value: stats.pendingDeliveries, color: theme.palette.warning.main },
            { label: 'Completed Deliveries', value: stats.completedDeliveries, color: '#4caf50' },
            { label: 'Failed Deliveries', value: stats.failedDeliveries, color: theme.palette.error.main },
          ].map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                elevation={3}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Actions */}
        <Grid container spacing={2} alignItems="center" mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                borderRadius: 3,
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
              onClick={() => navigate('/submit-order')}
            >
              Submit New Order
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Track Order by ID"
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
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
              inputProps={{ 'aria-label': 'track order' }}
            />
          </Grid>
        </Grid>

        {/* Recent Orders */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          
          Recent Orders
        </Typography>
        <Paper sx={{ borderRadius: 3, overflowX: 'auto', mb: 5 }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: 600,
            }}
            aria-label="Recent Orders"
          >
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme.palette.divider}` }}>
                {['Order ID', 'Date', 'Status', 'Destination'].map((head) => (
                  <th
                    key={head}
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <td style={{ padding: '12px 16px' }}>{order.id}</td>
                  <td style={{ padding: '12px 16px' }}>{order.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge
                      badgeContent={order.status}
                      color={
                        order.status === 'Delivered'
                          ? 'success'
                          : order.status === 'Failed'
                          ? 'error'
                          : 'warning'
                      }
                      sx={{
                        '& .MuiBadge-badge': {
                          textTransform: 'capitalize',
                          width: 'auto',
                          padding: '0 8px',
                          borderRadius: 10,
                          fontSize: 12,
                          height: 22,
                        },
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>{order.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>

        {/* Real-time Notifications */}
        <Typography variant="h6" gutterBottom>
          Real-time Notifications
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 3, maxHeight: 200, overflowY: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText primary="Order ORD1234 has been shipped." secondary="2 minutes ago" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="Route update: New high-priority delivery added." secondary="10 minutes ago" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="System maintenance planned for Sept 1, 2025." secondary="1 day ago" />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

