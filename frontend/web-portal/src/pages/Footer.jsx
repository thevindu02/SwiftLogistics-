// Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const COLORS = {
  darkBlue: '#001BB7',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

const navLinks = [
  { label: 'Contact Us', href: '#' },
];



export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: COLORS.darkBlue,
        color: 'white',
        py: { xs: 5, md: 6 },
        px: 0,
        mt: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, md: 2 } }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Left: Logo + Tagline */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                mb: 1,
                cursor: 'default',
                userSelect: 'none',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <span style={{ color: COLORS.orange }}>Swift</span>
              <span style={{ color: '#fff' }}>Logistics</span>
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 300, color: COLORS.lightGrey, mx: { xs: 'auto', md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
              Reliable last-mile delivery with transparent tracking.
            </Typography>
          </Grid>

          {/* Center: Navigation Links + Address */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center', mt: { xs: 2, md: 0 } }}>
            <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  underline="none"
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    '&:hover': { color: COLORS.orange },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: COLORS.lightGrey, fontFamily: "'Poppins', sans-serif" }}>
              123 Main Street, Colombo, Sri Lanka
            </Typography>
          </Grid>

          {/* Right: Social Media */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' }, mt: { xs: 2, md: 0 } }}>
            <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-end' }} gap={2}>
              <IconButton
                aria-label="LinkedIn"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'white',
                  '&:hover': { color: COLORS.orange },
                }}
              >
                <FaLinkedin size={24} />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'white',
                  '&:hover': { color: COLORS.orange },
                }}
              >
                <FaTwitter size={24} />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: 'white',
                  '&:hover': { color: COLORS.orange },
                }}
              >
                <FaFacebook size={24} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom copyright */}
        <Box mt={5} borderTop="1px solid rgba(255,255,255,0.15)" pt={2} textAlign="center">
          <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: COLORS.lightGrey }}>
            © 2025 Swift Logistics Pvt Ltd. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
