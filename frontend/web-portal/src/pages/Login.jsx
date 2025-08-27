import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const COLORS = {
  darkBlue: '#001BB7',
  blue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ username: '', password: '', remember: false });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    // Simple validation
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1500));
      // Replace with real API call
      // const res = await fetch('/api/login', ...)
      // if (res.ok) { ... }
      localStorage.setItem('token', 'demo-jwt-token');
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1200);
    } catch (err) {
      setError('Authentication failed.');
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
          Client Portal
        </Typography>
      </Box>
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 380 }}
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
              label="Email or Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <Box sx={{ position: 'relative', mb: 2 }}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <Box
                sx={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', cursor: 'pointer', color: COLORS.blue }}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Box>
            </Box>
            <FormControlLabel
              control={<Checkbox name="remember" checked={form.remember} onChange={handleChange} sx={{ color: COLORS.darkBlue }} />}
              label={<Typography fontSize={14} color={COLORS.darkBlue}>Remember Me</Typography>}
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
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          {/* Footer Links */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button href="#" sx={{ color: COLORS.blue, textTransform: 'none', fontSize: 14 }}>
              Forgot Password?
            </Button>
            <Button href="#" sx={{ color: COLORS.orange, textTransform: 'none', fontSize: 14 }}>
              Contact Support
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
