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
      // Simulate API call
      await new Promise(res => setTimeout(res, 1500));
      // Replace with real API call
      // const res = await fetch('/api/register', ...)
      // if (res.ok) { ... }
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, Nunito, sans-serif',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} color={COLORS.blue}>
          <span style={{ color: COLORS.orange }}>Swift</span>Logistics
        </Typography>
        <Typography variant="subtitle1" color={COLORS.darkBlue} fontWeight={500}>
          Create an Account
        </Typography>
      </Box>
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 4,
            boxShadow: '0 4px 24px rgba(0,27,183,0.08)',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
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
                bgcolor: COLORS.blue,
                color: '#fff',
                borderRadius: '20px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(0,70,255,0.08)',
                fontSize: '1.1rem',
                py: 1.2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: COLORS.darkBlue,
                  transform: 'scale(1.04)',
                },
              }}
              endIcon={loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : null}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          {/* Footer Links */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{ color: COLORS.blue, textTransform: 'none', fontSize: 14 }}
            >
              Already have an account? Login here
            </Link>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
