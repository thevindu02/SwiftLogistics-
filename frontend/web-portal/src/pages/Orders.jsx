import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
  cardBg: '#F5F8FF',
};

const recentOrders = [
  { id: 'ORD1234', date: '2025-08-25', status: 'Pending', destination: 'Colombo' },
  { id: 'ORD1235', date: '2025-08-24', status: 'Delivered', destination: 'Kandy' },
  { id: 'ORD1236', date: '2025-08-24', status: 'Failed', destination: 'Galle' },
  { id: 'ORD1237', date: '2025-08-23', status: 'Pending', destination: 'Negombo' },
  { id: 'ORD1238', date: '2025-08-22', status: 'Delivered', destination: 'Kurunegala' },
];

export default function Orders() {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" sx={{ fontWeight: 800, color: COLORS.darkBlue, mb: 2, fontFamily: 'Poppins', letterSpacing: 1 }}>
        Orders
      </Typography>
      <Typography variant="subtitle1" sx={{ color: COLORS.blue, mb: 3 }}>
        View and manage all your recent orders here.
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 4, bgcolor: COLORS.cardBg, boxShadow: 3, width: '100%', maxWidth: 700 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.darkBlue, mb: 3 }}>
          Recent Orders
        </Typography>
        <List>
          {recentOrders.map(order => (
            <ListItem key={order.id} sx={{ py: 2 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{order.id}</Typography>
                    <Badge
                      badgeContent={order.status}
                      color={
                        order.status === 'Delivered'
                          ? 'success'
                          : order.status === 'Failed'
                          ? 'error'
                          : 'warning'
                      }
                      sx={{ '& .MuiBadge-badge': { fontSize: 13, borderRadius: 8, px: 2 } }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: COLORS.darkBlue }}>
                    {order.date} - {order.destination}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
