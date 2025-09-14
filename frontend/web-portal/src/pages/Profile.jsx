import React from 'react';
import { Box, Typography, Avatar, Paper, Divider, Button } from '@mui/material';

const user = {
  name: 'Chaminda Perera',
  email: 'chaminda.perera@email.com',
  phone: '+94 71 234 5678',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export default function Profile({ onSidebarOpen }) {
  return (
    <Box className="min-h-screen bg-[#E9E9E9] flex flex-col items-center py-6 px-2" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif' }}>
      {/* Header with sidebar open button */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button onClick={onSidebarOpen} variant="outlined" sx={{ mr: 2, borderRadius: 2 }}>
          <span style={{ fontSize: 22, marginRight: 6 }}>☰</span> Menu
        </Button>
        <Typography variant="h4" fontWeight={700} color="#001BB7">
          Profile
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%', mb: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography variant="h5" fontWeight={700} color="#001BB7" gutterBottom>
            {user.name}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" mb={1}><b>Email:</b> {user.email}</Typography>
        <Typography variant="body1" mb={2}><b>Phone:</b> {user.phone}</Typography>
        <Button variant="contained" color="primary" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, width: '100%' }}>
          Edit Profile
        </Button>
      </Paper>
    </Box>
  );
}
