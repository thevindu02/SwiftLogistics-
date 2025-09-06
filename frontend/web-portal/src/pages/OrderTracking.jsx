import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, Chip, Stepper, Step, StepLabel, Switch, TextField, Grid, Divider } from '@mui/material';
import { Timeline } from 'antd';
import { motion } from 'framer-motion';
import { MdSearch, MdLocationOn, MdDirectionsCar, MdPerson, MdAccessTime, MdAutorenew } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import 'antd/dist/reset.css';

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statusSteps = [
  'Confirmed',
  'Picked Up',
  'In Transit',
  'Out for Delivery',
  'Delivered',
];

const fakeTracking = {
  orderId: 'ORD1001',
  currentStatus: 'In Transit',
  lastUpdate: '2025-08-29 14:30',
  currentLocation: 'Kurunegala Hub',
  milestones: [
    { status: 'Confirmed', time: '2025-08-27 09:00', location: 'Colombo Hub' },
    { status: 'Picked Up', time: '2025-08-27 12:00', location: 'Colombo Hub' },
    { status: 'In Transit', time: '2025-08-28 10:00', location: 'Kurunegala Hub' },
    { status: 'Out for Delivery', time: '', location: '' },
    { status: 'Delivered', time: '', location: '' },
  ],
  driver: {
    name: 'Nimal Perera',
    phone: '0771234567',
    vehicle: 'Toyota HiAce',
    plate: 'WP-AB-1234',
  },
  estimatedWindow: '2025-08-30 10:00 - 14:00',
  notifications: [
    { time: '2025-08-29 14:30', message: 'Arrived at Kurunegala Hub' },
    { time: '2025-08-28 10:00', message: 'Left Colombo Hub' },
    { time: '2025-08-27 12:00', message: 'Package picked up by driver' },
  ],
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('ORD1001');
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTracking(fakeTracking);
      setActiveStep(statusSteps.indexOf(fakeTracking.currentStatus));
      setLoading(false);
    }, 800);
    // Placeholder for WebSocket/auto-refresh logic
  }, [orderId, autoRefresh]);

  const handleTrack = () => {
    if (!orderId.trim()) {
      toast.error('Please enter an Order ID');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setTracking(fakeTracking);
      setActiveStep(statusSteps.indexOf(fakeTracking.currentStatus));
      setLoading(false);
      toast.success('Tracking info loaded!');
    }, 800);
  };

  return (
    <Box className="min-h-screen bg-[#E9E9E9] flex flex-col items-center py-6 px-2" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <motion.div initial="hidden" animate="visible" variants={sectionFade} className="w-full max-w-6xl">
        <Typography variant="h4" className="mb-6 font-bold text-[#001BB7]" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: '2.2rem' }}>
          Track Order - #{orderId}
        </Typography>
        {/* Search Section */}
        <Box className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <TextField
            label="Order ID"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            variant="outlined"
            size="medium"
            sx={{ borderRadius: 2, minWidth: 220 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdSearch />}
            sx={{ background: '#0046FF', borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 120 }}
            onClick={handleTrack}
            disabled={loading}
          >
            Track
          </Button>
          <Box className="flex items-center gap-2 ml-2">
            <Switch checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} color="primary" />
            <Typography variant="body2" color="text.secondary">Auto-refresh</Typography>
            <MdAutorenew className={autoRefresh ? 'animate-spin' : ''} color="#0046FF" />
          </Box>
        </Box>
        {loading || !tracking ? (
          <Box className="flex justify-center items-center min-h-[200px]"><Typography>Loading...</Typography></Box>
        ) : (
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              {/* Real-time Status Card */}
              <Card className="rounded-2xl shadow-lg mb-4">
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom>Current Status</Typography>
                  <Typography variant="h4" className="font-bold mb-2">{tracking.currentStatus}</Typography>
                  <Typography><b>Last Update:</b> {tracking.lastUpdate}</Typography>
                  <Typography><b>Current Location:</b> {tracking.currentLocation}</Typography>
                </CardContent>
              </Card>
              {/* Delivery Progress Bar */}
              <Card className="rounded-2xl shadow-lg mb-4">
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom>Delivery Progress</Typography>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {statusSteps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
              {/* Status Timeline */}
              <Card className="rounded-2xl shadow-lg mb-4">
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom>Status Timeline</Typography>
                  <Timeline
                    mode="left"
                    items={tracking.milestones.map((item, idx) => ({
                      color: item.status === 'Delivered' ? '#FF8040' : item.status === 'Out for Delivery' ? '#0046FF' : '#001BB7',
                      label: item.time,
                      children: (
                        <Box className="flex items-center gap-2">
                          <MdLocationOn color="#0046FF" />
                          <span className="font-semibold">{item.status}</span>
                          <span className="text-gray-500 text-xs">{item.location}</span>
                        </Box>
                      ),
                    }))}
                  />
                </CardContent>
              </Card>
              {/* Live Updates Panel */}
              <Card className="rounded-2xl shadow-lg mb-4">
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom>Live Updates</Typography>
                  <Box className="max-h-40 overflow-y-auto">
                    {tracking.notifications.map((n, i) => (
                      <Box key={i} className="flex items-center gap-2 mb-2">
                        <MdAccessTime color="#001BB7" />
                        <Typography variant="body2"><b>{n.time}:</b> {n.message}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              {/* Live Map Placeholder */}
              <Card className="rounded-2xl shadow-lg mb-4">
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom>Live Map</Typography>
                  <Box className="w-full h-64 bg-[#E9E9E9] flex items-center justify-center rounded-xl border border-dashed border-[#0046FF]">
                    <Typography color="#0046FF">[Map integration placeholder]</Typography>
                  </Box>
                </CardContent>
              </Card>
              {/* Delivery Info Card */}
              <Card className="rounded-2xl shadow-lg mb-4">
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom>Delivery Info</Typography>
                  <Box className="flex items-center gap-2 mb-2">
                    <MdPerson color="#001BB7" />
                    <Typography variant="body2"><b>Driver:</b> {tracking.driver.name} ({tracking.driver.phone})</Typography>
                  </Box>
                  <Box className="flex items-center gap-2 mb-2">
                    <MdDirectionsCar color="#0046FF" />
                    <Typography variant="body2"><b>Vehicle:</b> {tracking.driver.vehicle} ({tracking.driver.plate})</Typography>
                  </Box>
                  <Box className="flex items-center gap-2 mb-2">
                    <MdAccessTime color="#FF8040" />
                    <Typography variant="body2"><b>Estimated Delivery:</b> {tracking.estimatedWindow}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </motion.div>
    </Box>
  );
};

export default OrderTracking;
