
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Chip, Grid, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { Timeline, Table } from 'antd';
import { motion } from 'framer-motion';
import { MdTrackChanges, MdFileDownload, MdReportProblem, MdCancel, MdLocalShipping, MdCheckCircle, MdPending } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import 'antd/dist/reset.css';

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statusSteps = ['Pending', 'In Transit', 'Delivered'];

const fakeOrderDetails = {
  orderId: 'ORD1001',
  orderDate: '2025-08-25',
  status: 'In Transit',
  estimated: '2025-09-01',
  weight: '2.5',
  dimensions: '30×20×10',
  value: '10000',
  specialInstructions: 'Fragile, keep upright',
  packagePhoto: '',
  recipient: 'John Doe',
  phone: '0712345678',
  address: '123 Main St, Colombo',
  deliveryInstructions: 'Leave at reception',
  timeline: [
    { status: 'Pending', time: '2025-08-25 09:00', location: 'Colombo Hub', icon: <MdPending color="#001BB7" /> },
    { status: 'In Transit', time: '2025-08-26 14:30', location: 'Galle Hub', icon: <MdLocalShipping color="#0046FF" /> },
    { status: 'Delivered', time: '', location: '', icon: <MdCheckCircle color="#FF8040" /> },
  ],
  actions: [
    { key: 'track', label: 'Track Real-time', type: 'primary', icon: <MdTrackChanges />, onClick: () => toast.info('Tracking real-time (placeholder)') },
    { key: 'download', label: 'Download Invoice', type: 'default', icon: <MdFileDownload />, onClick: () => toast.success('Invoice downloaded (placeholder)') },
    { key: 'report', label: 'Report Issue', type: 'warning', icon: <MdReportProblem />, onClick: () => toast.warn('Report issue (placeholder)') },
    { key: 'cancel', label: 'Cancel Order', type: 'danger', icon: <MdCancel />, onClick: () => toast.error('Order cancelled (placeholder)') },
  ],
};

const OrderDetails = ({ onSidebarOpen }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrder(fakeOrderDetails);
      setActiveStep(statusSteps.indexOf(fakeOrderDetails.status));
      setLoading(false);
    }, 800);
    // Placeholder for WebSocket real-time updates
  }, []);

  if (loading || !order) {
    return (
      <Box className="min-h-screen flex items-center justify-center bg-[#E9E9E9]">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // AntD Table for package details (if more fields needed)
  // const packageColumns = [ ... ];

  return (
    <Box className="min-h-screen bg-[#E9E9E9] flex flex-col items-center py-6 px-2" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <motion.div initial="hidden" animate="visible" variants={sectionFade} className="w-full max-w-4xl">
        {/* Header with sidebar open button */}
        <Box className="flex items-center mb-4">
          <Button onClick={onSidebarOpen} variant="outlined" sx={{ mr: 2, borderRadius: 2 }}>
            <span style={{ fontSize: 22, marginRight: 6 }}>☰</span> Menu
          </Button>
          <Typography variant="h4" className="font-bold text-[#001BB7]" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: '2.2rem', letterSpacing: '0.02em' }}>
            Order Details - #{order.orderId}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {/* Order Info Card */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" animate="visible" variants={sectionFade}>
              <Card className="rounded-2xl shadow-lg mb-4" sx={{ background: '#F5F8FF', borderRadius: '1.2rem', boxShadow: '0 4px 16px #001bb71a' }}>
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom sx={{ fontWeight: 700 }}>Order Information</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Order ID:</b> {order.orderId}</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Date:</b> {order.orderDate}</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Status:</b> <Chip label={order.status} color={order.status === 'Delivered' ? 'success' : order.status === 'In Transit' ? 'info' : 'warning'} /></Typography>
                  <Box className="my-4">
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {statusSteps.map((label) => (
                        <Step key={label}>
                          <StepLabel sx={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontWeight: 600 }}>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Estimated Delivery:</b> {order.estimated}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          {/* Package Info Card */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" animate="visible" variants={sectionFade}>
              <Card className="rounded-2xl shadow-lg mb-4" sx={{ background: '#F5F8FF', borderRadius: '1.2rem', boxShadow: '0 4px 16px #001bb71a' }}>
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom sx={{ fontWeight: 700 }}>Package Information</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Weight:</b> {order.weight} kg</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Dimensions:</b> {order.dimensions} cm</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Value:</b> LKR {order.value}</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Special Instructions:</b> {order.specialInstructions}</Typography>
                  {order.packagePhoto ? (
                    <img src={order.packagePhoto} alt="Package" className="rounded-lg mt-2 w-full max-h-40 object-cover" />
                  ) : (
                    <Box className="mt-2 text-gray-400 italic">No package photo available</Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          {/* Delivery Info Card */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" animate="visible" variants={sectionFade}>
              <Card className="rounded-2xl shadow-lg mb-4" sx={{ background: '#F5F8FF', borderRadius: '1.2rem', boxShadow: '0 4px 16px #001bb71a' }}>
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom sx={{ fontWeight: 700 }}>Delivery Information</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Recipient:</b> {order.recipient}</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Phone:</b> {order.phone}</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Address:</b> {order.address}</Typography>
                  <Typography sx={{ fontSize: '1.1rem' }}><b>Delivery Instructions:</b> {order.deliveryInstructions}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          {/* Tracking Timeline */}
          <Grid item xs={12} md={6}>
            <motion.div initial="hidden" animate="visible" variants={sectionFade}>
              <Card className="rounded-2xl shadow-lg mb-4" sx={{ background: '#F5F8FF', borderRadius: '1.2rem', boxShadow: '0 4px 16px #001bb71a' }}>
                <CardContent>
                  <Typography variant="h6" color="#0046FF" gutterBottom sx={{ fontWeight: 700 }}>Tracking Timeline</Typography>
                  <Timeline
                    mode="left"
                    items={order.timeline.map((item, idx) => ({
                      color: item.status === 'Delivered' ? '#FF8040' : item.status === 'In Transit' ? '#0046FF' : '#001BB7',
                      label: item.time,
                      children: (
                        <Box className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-semibold">{item.status}</span>
                          <span className="text-gray-500 text-xs">{item.location}</span>
                        </Box>
                      ),
                    }))}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        {/* Action Buttons */}
        <Box className="flex flex-wrap gap-4 mt-6 justify-end">
          {order.actions.map(action => (
            <Button
              key={action.key}
              variant={action.type === 'primary' ? 'contained' : action.type === 'default' ? 'outlined' : action.type === 'warning' ? 'outlined' : 'contained'}
              color={action.type === 'primary' ? 'primary' : action.type === 'default' ? 'primary' : action.type === 'warning' ? 'warning' : 'error'}
              startIcon={action.icon}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 160, background: action.type === 'danger' ? '#FF8040' : undefined }}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default OrderDetails;
