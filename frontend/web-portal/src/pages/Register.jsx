import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Alert, CircularProgress, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validation
    if (!form.fullName || !form.company || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.agree) {
      setError('You must agree to the Terms & Privacy Policy.');
      return;
    }
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: COLORS.lightGrey,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        fontFamily: 'Poppins, Nunito, sans-serif',
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.darkBlue} 100%)`,
          color: '#fff',
          borderTopLeftRadius: 32,
          borderBottomLeftRadius: 32,
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ textAlign: 'center', px: 6 }}>
          {/* SwiftLogistics logo */}
          <Typography variant="h4" fontWeight={700} sx={{ mb: 5 }}>
            <span style={{ color: COLORS.orange }}>Swift</span>
            <span style={{ color: COLORS.white }}>Logistics</span>
          </Typography>
          <Typography variant="h3" fontWeight={700} mb={2}>
            Create your account
          </Typography>
          <Typography variant="h6" fontWeight={400} mb={2}>
            Register to access the client portal and manage your logistics.
          </Typography>
          {/* Abstract shapes (simple SVGs for demo) */}
          <Box sx={{ position: 'absolute', top: 40, left: 40, opacity: 0.15 }}>
            <svg width="80" height="80"><circle cx="40" cy="40" r="30" fill={COLORS.orange} /></svg>
          </Box>
          <Box sx={{ position: 'absolute', bottom: 60, right: 60, opacity: 0.12 }}>
            <svg width="100" height="60"><rect x="10" y="10" width="80" height="40" rx="20" fill="#fff" /></svg>
          </Box>
        </Box>
      </Box>

      {/* Right Panel (Form) */}
      <Box
        sx={{
          flex: 1,
          minWidth: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fff',
          borderTopRightRadius: 32,
          borderBottomRightRadius: 32,
          boxShadow: { md: '0 4px 24px rgba(0,27,183,0.08)' },
          py: { xs: 6, md: 0 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, px: 2 }}>
          <Typography variant="h4" fontWeight={700} color={COLORS.darkBlue} mb={3}>
            Register
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <TextField
              label="Company/Business Name"
              name="company"
              value={form.company}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
              type="email"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
              type="tel"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <FormControlLabel
              control={<Checkbox name="agree" checked={form.agree} onChange={handleChange} sx={{ color: COLORS.darkBlue }} />}
              label={<Typography fontSize={14} color={COLORS.darkBlue}>I agree to Terms & Privacy Policy</Typography>}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                background: `linear-gradient(90deg, ${COLORS.darkBlue} 0%, ${COLORS.blue} 100%)`,
                color: '#fff',
                borderRadius: '20px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.1rem',
                py: 1.2,
                boxShadow: '0 2px 8px rgba(0,70,255,0.08)',
                transition: 'all 0.2s',
                '&:hover': {
                  background: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.darkBlue} 100%)`,
                  transform: 'scale(1.04)',
                },
              }}
              endIcon={loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : null}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography fontSize={15} color={COLORS.darkBlue}>
              Already have an account?{' '}
              <Button sx={{ color: COLORS.blue, textTransform: 'none', fontSize: 15, p: 0 }} onClick={() => navigate('/login')}>
                Login here
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
