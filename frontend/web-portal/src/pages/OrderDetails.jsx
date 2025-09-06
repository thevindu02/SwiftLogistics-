import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Chip, Grid, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { Timeline } from 'antd';
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
};

const statusSteps = ['Pending', 'In Transit', 'Delivered'];

const OrderDetails = () => {
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

  return (
    <Box className="min-h-screen bg-[#E9E9E9] flex flex-col items-center py-6 px-2" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <motion.div initial="hidden" animate="visible" variants={sectionFade} className="w-full max-w-4xl">
        <Typography variant="h4" className="mb-6 font-bold text-[#001BB7]" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: '2.2rem' }}>
          Order Details - #{order.orderId}
        </Typography>
        <Grid container spacing={3}>
          {/* Order Info Card */}
          <Grid item xs={12} md={6}>
            <Card className="rounded-2xl shadow-lg mb-4">
              <CardContent>
                <Typography variant="h6" color="#0046FF" gutterBottom>Order Information</Typography>
                <Typography><b>Order ID:</b> {order.orderId}</Typography>
                <Typography><b>Date:</b> {order.orderDate}</Typography>
                <Typography><b>Status:</b> <Chip label={order.status} color={order.status === 'Delivered' ? 'success' : order.status === 'In Transit' ? 'info' : 'warning'} /></Typography>
                <Box className="my-4">
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {statusSteps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Typography><b>Estimated Delivery:</b> {order.estimated}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Package Info Card */}
          <Grid item xs={12} md={6}>
            <Card className="rounded-2xl shadow-lg mb-4">
              <CardContent>
                <Typography variant="h6" color="#0046FF" gutterBottom>Package Information</Typography>
                <Typography><b>Weight:</b> {order.weight} kg</Typography>
                <Typography><b>Dimensions:</b> {order.dimensions} cm</Typography>
                <Typography><b>Value:</b> LKR {order.value}</Typography>
                <Typography><b>Special Instructions:</b> {order.specialInstructions}</Typography>
                {order.packagePhoto ? (
                  <img src={order.packagePhoto} alt="Package" className="rounded-lg mt-2 w-full max-h-40 object-cover" />
                ) : (
                  <Box className="mt-2 text-gray-400 italic">No package photo available</Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          {/* Delivery Info Card */}
          <Grid item xs={12} md={6}>
            <Card className="rounded-2xl shadow-lg mb-4">
              <CardContent>
                <Typography variant="h6" color="#0046FF" gutterBottom>Delivery Information</Typography>
                <Typography><b>Recipient:</b> {order.recipient}</Typography>
                <Typography><b>Phone:</b> {order.phone}</Typography>
                <Typography><b>Address:</b> {order.address}</Typography>
                <Typography><b>Delivery Instructions:</b> {order.deliveryInstructions}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Tracking Timeline */}
          <Grid item xs={12} md={6}>
            <Card className="rounded-2xl shadow-lg mb-4">
              <CardContent>
                <Typography variant="h6" color="#0046FF" gutterBottom>Tracking Timeline</Typography>
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
          </Grid>
        </Grid>
        {/* Action Buttons */}
        <Box className="flex flex-wrap gap-4 mt-6 justify-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdTrackChanges />}
            sx={{ background: '#0046FF', borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 160 }}
            onClick={() => toast.info('Tracking real-time (placeholder)')}
          >
            Track Real-time
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<MdFileDownload />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 160 }}
            onClick={() => toast.success('Invoice downloaded (placeholder)')}
          >
            Download Invoice
          </Button>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<MdReportProblem />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 160 }}
            onClick={() => toast.warn('Report issue (placeholder)')}
          >
            Report Issue
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<MdCancel />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 160 }}
            onClick={() => toast.error('Order cancelled (placeholder)')}
          >
            Cancel Order
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default OrderDetails;
