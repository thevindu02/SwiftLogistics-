// OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Switch,
  FormControlLabel,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COLORS = {
  deepBlue: '#001BB7',
  primaryBlue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

// Remove framer-motion and fadeInVariants for simplicity

const STEPS = ['Confirmed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];

const DUMMY_DRIVER_INFO = {
  name: 'Chaminda Perera',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  vehicle: 'Toyota HiAce Van - Reg: WP GB 1234',
  estimatedWindow: '2025-09-10, 4:00 PM - 6:00 PM',
};

const DUMMY_LIVE_UPDATES = [
  { id: 1, message: 'Package loaded onto vehicle.', timestamp: '5 minutes ago' },
  { id: 2, message: 'Left warehouse, heading to pickup point.', timestamp: '10 minutes ago' },
  { id: 3, message: 'Package scanned at pickup point.', timestamp: '30 minutes ago' },
];

export default function OrderTracking({ onSidebarOpen }) {
  const [orderId, setOrderId] = useState('');
  const [trackedOrderId, setTrackedOrderId] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState(DUMMY_LIVE_UPDATES);

  // Simulate WebSocket live updates on interval if autoRefresh enabled
  useEffect(() => {
    if (!autoRefresh || !trackedOrderId) return;

    const interval = setInterval(() => {
      // For demo, just add dummy new update alternately
      setLiveUpdates((updates) => {
        const newUpdate = {
          id: updates.length + 1,
          message: `Update #${updates.length + 1} for order ${trackedOrderId}`,
          timestamp: 'Just now',
        };
        return [newUpdate, ...updates].slice(0, 5);
      });
      setCurrentStep((step) => (step < STEPS.length - 1 ? step + 1 : step));
      toast.info(`Order ${trackedOrderId} status updated.`, { autoClose: 2000, position: 'top-right' });
    }, 15000);

    return () => clearInterval(interval);
  }, [autoRefresh, trackedOrderId]);

  // Validation and Track button handler
  const handleTrack = () => {
    if (!orderId.trim()) {
      toast.error('Please enter a valid Order ID.');
      return;
    }
    setTrackedOrderId(orderId.trim());
    setCurrentStep(0);
    setLiveUpdates(DUMMY_LIVE_UPDATES);
    toast.success(`Tracking order ${orderId.trim()} started`, { autoClose: 3000, position: 'top-right' });
  };

  return (
    <Box className="max-w-7xl mx-auto p-6 sm:p-10 font-poppins" aria-label="Order Tracking Page">
      {/* Header with sidebar open button */}
      <Box display="flex" alignItems="center" mb={2}>
        <Button onClick={onSidebarOpen} variant="outlined" sx={{ mr: 2, borderRadius: 2 }}>
          <span style={{ fontSize: 22, marginRight: 6 }}>☰</span> Menu
        </Button>
        <Typography variant="h4" fontWeight="700" color={COLORS.deepBlue}>
          Track Order{trackedOrderId && ` - #${trackedOrderId}`}
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" mb={4}>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            label="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            fullWidth
            variant="outlined"
            inputProps={{ 'aria-label': 'Order ID input' }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleTrack}
            sx={{
              bgcolor: COLORS.primaryBlue,
              '&:hover': { bgcolor: '#0039bb' },
              borderRadius: 3,
              height: '56px',
              fontWeight: 600,
              textTransform: 'none',
            }}
            aria-label="Track Order"
          >
            Track
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} aria-label="Current order status">
            <Typography variant="h5" fontWeight="700" color={COLORS.primaryBlue} gutterBottom>
              Current Status: {STEPS[currentStep]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last update: {liveUpdates[0]?.timestamp || '-'}
            </Typography>
          </Paper>
          <Paper sx={{ mb: 4, p: 3, borderRadius: 3 }}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
          <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }} aria-label="Delivery information">
            <Typography variant="h6" fontWeight={600} mb={3}>
              Delivery Information
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar alt={DUMMY_DRIVER_INFO.name} src={DUMMY_DRIVER_INFO.avatarUrl} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography fontWeight={600}>{DUMMY_DRIVER_INFO.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Driver
                </Typography>
              </Box>
            </Box>
            <Typography>
              <strong>Vehicle: </strong> {DUMMY_DRIVER_INFO.vehicle}
            </Typography>
            <Typography>
              <strong>Estimated Delivery Window: </strong> {DUMMY_DRIVER_INFO.estimatedWindow}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Live Updates
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoRefresh}
                    onChange={() => setAutoRefresh((prev) => !prev)}
                    color="primary"
                    inputProps={{ 'aria-label': 'Auto-refresh toggle' }}
                  />
                }
                label="Auto-refresh"
              />
            </Box>
            <Box sx={{ maxHeight: 150, overflowY: 'auto' }} aria-live="polite">
              {liveUpdates.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No live updates available.
                </Typography>
              ) : (
                liveUpdates.map(({ id, message, timestamp }) => (
                  <Box key={id} sx={{ mb: 1 }}>
                    <Typography variant="body2">{message}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {timestamp}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              height: { xs: 300, md: '100%' },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            }}
            aria-label="Live Location Map"
          >
            <iframe
              title="Live Order Location Map"
              src="https://maps.google.com/maps?q=colombo&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              aria-describedby="map-description"
            />
          </Paper>
          <Typography id="map-description" variant="caption" color="text.secondary" mt={1}>
            Map showing live location of your order.
          </Typography>
        </Grid>
      </Grid>
      <ToastContainer position="top-right" />
    </Box>
  );
}

