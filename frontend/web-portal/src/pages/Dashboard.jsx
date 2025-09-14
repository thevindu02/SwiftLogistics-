import React, { useState } from 'react';
import TopNavbar from './TopNavBarAfter';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import courierImage from '../assets/courier-illustration.jpg';

// Define stats and recentOrders at top-level
const stats = [
  { icon: '😊', number: '3400', label: 'Happy Customer' },
  { icon: '📈', number: '70%', label: 'Average Shipment Growth' },
  { icon: '⏰', number: '99%', label: 'On Time Delivery' },
  { icon: '📦', number: '85%', label: 'Orders Daily' },
];

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
  white: '#FFFFFF',
};

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleRequestCallback = () => {
    // Handle callback request
    console.log('Callback requested for:', formData);
    alert('Callback request submitted successfully!');
  };

  return (
    <>
      <TopNavbar />
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1a1a1a',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${courierImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 12,
          color: 'white',
        }}
      >
        <Box sx={{ px: { xs: 3, sm: 6, md: 8 }, maxWidth: '100%' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '3px solid', borderColor: COLORS.orange, p: 4, borderRadius: 2, display: 'inline-block' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Most Trusted{' '}
                  <span style={{ color: COLORS.orange }}>Logistics</span> &<br />
                  Delivery Services
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and type-setting industry.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: COLORS.orange,
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#e6733a',
                    },
                  }}
                >
                  Explore More →
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ pt: 8, px: { xs: 3, sm: 6, md: 8 }, pb: 0 }}>
        <Grid container spacing={6}>
          {/* Company Information */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: '#000',
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '0.5px',
              }}
            >
              OUR COMPANY
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#333',
                mb: 1,
                fontWeight: 500,
                fontSize: { xs: '1.3rem', md: '1.5rem' },
              }}
            >
              SwiftLogistics Sri Lanka
            </Typography>
            <Box sx={{ width: 80, height: 3, bgcolor: COLORS.orange, mb: 4 }} />
            
            <Typography
              variant="body1"
              sx={{
                mb: 5,
                lineHeight: 1.7,
                color: '#555',
                fontSize: '1rem',
                textAlign: 'justify',
              }}
            >
              SwiftLogistics is a trusted and experienced provider of smart solutions related to 
              ocean freight forwarding, rail services, and domestic logistics, including delivery. 
              Our headquarters is located in Delhi, where the process begins to optimize and 
              customize supply chain solutions across our global network, spanning six continents.
            </Typography>

            {/* Statistics Grid - 2x2 Layout */}
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'left',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                      borderLeft: '4px solid #ff8040',
                      bgcolor: 'white',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: '50%',
                        bgcolor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2.5,
                        border: '2px solid #e9ecef',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.6rem' }}>
                        {stat.icon}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: '#000',
                          fontSize: { xs: '1.6rem', sm: '1.8rem' },
                          mb: 0.5,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Contact Form - Right below statistics */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#2c5aa0',
                  color: 'white',
                  borderRadius: 2,
                  boxShadow: '0 6px 20px rgba(44, 90, 160, 0.2)',
                  width: '100%',
                  maxWidth: '600px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ flexWrap: 'nowrap' }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      placeholder="Enter Your Name"
                      variant="outlined"
                      size="small"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'white',
                          borderRadius: 1.5,
                          fontSize: '0.85rem',
                          height: '42px',
                        },
                        '& .MuiInputBase-input': {
                          padding: '10px 12px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      placeholder="Enter Your Mobile No."
                      variant="outlined"
                      size="small"
                      value={formData.mobile}
                      onChange={handleInputChange('mobile')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'white',
                          borderRadius: 1.5,
                          fontSize: '0.85rem',
                          height: '42px',
                        },
                        '& .MuiInputBase-input': {
                          padding: '10px 12px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleRequestCallback}
                      sx={{
                        bgcolor: COLORS.orange,
                        color: 'white',
                        fontWeight: 600,
                        py: 1.3,
                        textTransform: 'none',
                        fontSize: '0.85rem',
                        borderRadius: 1.5,
                        height: '42px',
                        '&:hover': {
                          bgcolor: '#e6733a',
                        },
                      }}
                    >
                      Request A Call Back!
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>

          {/* Right Side - Image Only */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Image with Text Overlay */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: 320,
                  width: '100%',
                  backgroundImage: `url(${courierImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                {/* Text overlay on the right side */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '45%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    pr: 4,
                    background: 'linear-gradient(to left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#001BB7',
                      mb: 2,
                      textAlign: 'right',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    Fast & Reliable
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: '#FF8040',
                      mb: 3,
                      textAlign: 'right',
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                    }}
                  >
                    Delivery Service
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#333',
                      textAlign: 'right',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      maxWidth: '200px',
                      fontSize: '0.95rem',
                    }}
                  >
                    Professional courier services with real-time tracking and on-time delivery guarantee.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* OUR PROCESS Section */}
      <Box sx={{ py: 6, px: { xs: 3, sm: 6, md: 8 }, bgcolor: '#1e3a5f', color: 'white', position: 'relative', mt: -40 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Grid container spacing={6} alignItems="center">
            {/* Content - Full Width */}
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: 'white',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    letterSpacing: '0.5px',
                  }}
                >
                  OUR PROCESS
                </Typography>
              </Box>
            </Grid>
          </Grid>        {/* Process Steps */}
        <Grid container spacing={3} sx={{ mt: 6, justifyContent: 'center' }}>
          {[
            {
              step: '01',
              title: 'Tell Us About Your Requirement',
              icon: '📱',
              bgColor: 'rgba(135, 206, 235, 0.3)',
              description: 'Share your delivery requirements with us'
            },
            {
              step: '02',
              title: 'Pack Pick And Ship',
              icon: '🚚',
              bgColor: '#FF8040',
              description: 'We pack and ship your items securely'
            },
            {
              step: '03',
              title: 'Track You Order',
              icon: '📍',
              bgColor: 'rgba(255, 128, 64, 0.3)',
              description: 'Real-time tracking of your delivery'
            },
            {
              step: '04',
              title: 'Support & Feedback',
              icon: '💬',
              bgColor: 'rgba(135, 206, 235, 0.3)',
              description: 'Continuous support and feedback'
            },
          ].map((process, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                  mb: 4,
                }}
              >
                {/* Main Process Circle */}
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    bgcolor: process.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '5rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    position: 'relative',
                    border: process.step === '02' ? 'none' : '4px solid rgba(255,255,255,0.8)',
                    overflow: 'hidden',
                  }}
                >
                  {process.icon}
                  {/* White overlay for non-orange circles */}
                  {process.step !== '02' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '5rem',
                      }}
                    >
                      {process.icon}
                    </Box>
                  )}
                </Box>
                
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'white',
                    fontSize: '1.1rem',
                    maxWidth: '180px',
                    mx: 'auto',
                    lineHeight: 1.3,
                  }}
                >
                  {process.title}
                </Typography>

                {/* Step Number Circle */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    bgcolor: '#1e3a5f',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    mx: 'auto',
                    border: '3px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  {process.step}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Services Provide By Section */}
      <Box sx={{ py: 8, px: { xs: 3, sm: 6, md: 8 }, bgcolor: '#f5f5f5' }}>
        <Grid container spacing={6}>
          {/* Left Side - Title */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: '#000',
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '0.5px',
              }}
            >
              Services Provide By
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#333',
                mb: 1,
                fontWeight: 500,
                fontSize: { xs: '1.3rem', md: '1.5rem' },
              }}
            >
              SwiftLogistics Sri Lanka
            </Typography>
            <Box sx={{ width: 80, height: 3, bgcolor: COLORS.orange, mb: 4 }} />
          </Grid>

          {/* Right Side - Description */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.7,
                color: '#555',
                fontSize: '1rem',
                mt: { xs: 0, md: 2 },
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Typography>
          </Grid>
        </Grid>

        {/* Services Grid */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              title: 'E-Commerce Delivery Solution',
              image: '🚚',
              color: COLORS.orange
            },
            {
              title: 'Overseas Warehousing',
              image: '🏭',
              color: '#2c5aa0'
            },
            {
              title: 'Air & Sea Freight',
              image: '✈️',
              color: '#2c5aa0'
            },
            {
              title: 'Supply Chain Management',
              image: '📦',
              color: COLORS.orange
            },
            {
              title: 'Express Delivery',
              image: '⚡',
              color: '#2c5aa0'
            },
            {
              title: 'Warehousing Solutions',
              image: '🏢',
              color: COLORS.orange
            },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  height: 200,
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    bgcolor: service.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'relative',
                  }}
                >
                  <Typography sx={{ fontSize: '4rem', mb: 2 }}>
                    {service.image}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    {service.title}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </Box>
      </Box>
    </Box>
    </>
  );
}
