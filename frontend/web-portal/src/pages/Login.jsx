import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username: '', password: '', remember: false });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(res => setTimeout(res, 1000));
      if (form.remember) {
        localStorage.setItem('token', 'demo-jwt-token');
      } else {
        sessionStorage.setItem('token', 'demo-jwt-token');
      }
      navigate('/dashboard');
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
            Welcome back!
          </Typography>
          <Typography variant="h6" fontWeight={400} mb={2}>
            You can sign in to access with your existing account.
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
        <Box sx={{ width: '100%', maxWidth: 380, px: 2 }}>
          <Typography variant="h4" fontWeight={700} color={COLORS.darkBlue} mb={3}>
            Sign In
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              label="Username or email"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2, borderRadius: 2 }}
              InputProps={{ style: { fontSize: '1.1rem' } }}
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
                InputProps={{ style: { fontSize: '1.1rem' } }}
              />
              <Box
                sx={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', cursor: 'pointer', color: COLORS.blue }}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <FormControlLabel
                control={<Checkbox name="remember" checked={form.remember} onChange={handleChange} sx={{ color: COLORS.darkBlue }} />}
                label={<Typography fontSize={14} color={COLORS.darkBlue}>Remember me</Typography>}
              />
              <Button sx={{ color: COLORS.blue, textTransform: 'none', fontSize: 14 }} href="#">
                Forgot password?
              </Button>
            </Box>
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography fontSize={15} color={COLORS.darkBlue}>
              New here?{' '}
              <Button sx={{ color: COLORS.orange, textTransform: 'none', fontSize: 15, p: 0 }} onClick={() => navigate('/register')}>
                Create an Account
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
