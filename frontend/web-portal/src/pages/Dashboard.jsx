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

import Sidebar from './Sidebar.jsx';
import MenuIcon from '@mui/icons-material/Menu';

// Define stats and recentOrders at top-level
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

export default function Dashboard({ onSidebarOpen }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [trackOrderId, setTrackOrderId] = useState('');
  const navigate = useNavigate();
  // Sidebar state is now managed globally in App.jsx

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Main content container */}
      <Box sx={{ p: 4, maxWidth: 2000, mx: 'auto', mt: 2 }}>
        {/* Header with sidebar open button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button onClick={onSidebarOpen} variant="outlined" sx={{ mr: 2, borderRadius: 2 }}>
            <span style={{ fontSize: 22, marginRight: 6 }}>☰</span> Menu
          </Button>
          <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main}>
            Dashboard
          </Typography>
        </Box>
        {/* ...existing code... */}
        {/* Stats cards, actions, recent orders, notifications remain unchanged */}
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
                  p: -1,
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
        <Typography variant="h6" sx={{ mb: 5 }}>
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
        <Typography variant="h6" gutterBottom>
          Real-time Notifications
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 3, maxHeight: 200, overflowY: 'auto' }}>
          <List>
            {[ 
              <ListItem key="n1">
                <ListItemText primary="Order ORD1234 has been shipped." secondary="2 minutes ago" />
              </ListItem>,
              <Divider key="d1" component="li" />,
              <ListItem key="n2">
                <ListItemText primary="Route update: New high-priority delivery added." secondary="10 minutes ago" />
              </ListItem>,
              <Divider key="d2" component="li" />,
              <ListItem key="n3">
                <ListItemText primary="System maintenance planned for Sept 1, 2025." secondary="1 day ago" />
              </ListItem>
            ]}
          </List>
        </Paper>
      </Box>
    </Box>
  );
// ...existing code...
}

