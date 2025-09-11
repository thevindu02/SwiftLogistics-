// Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const COLORS = {
  darkBlue: '#1e3a5f',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
  footerBg: '#0f1419',
  textSecondary: '#94a3b8',
};

const quickLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Our Services', href: '#' },
  { label: 'Tracking', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const services = [
  { label: 'Last Mile Delivery', href: '#' },
  { label: 'Express Shipping', href: '#' },
  { label: 'Freight Services', href: '#' },
  { label: 'Warehousing', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Refund Policy', href: '#' },
];



export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: COLORS.footerBg,
        color: 'white',
        py: { xs: 6, md: 8 },
        px: 0,
        mt: 8,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 2 } }}>
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                mb: 2,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
              }}
            >
              <span style={{ color: COLORS.orange }}>Swift</span>
              <span style={{ color: '#fff' }}>Logistics</span>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: COLORS.textSecondary, 
                mb: 3, 
                lineHeight: 1.6,
                maxWidth: 280 
              }}
            >
              Leading the way in reliable last-mile delivery solutions with cutting-edge technology and transparent tracking systems across Sri Lanka.
            </Typography>
            
            {/* Contact Info */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FaPhone style={{ color: COLORS.orange, marginRight: '12px', fontSize: '14px' }} />
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  +94 11 234 5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FaEnvelope style={{ color: COLORS.orange, marginRight: '12px', fontSize: '14px' }} />
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  info@swiftlogistics.lk
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <FaMapMarkerAlt style={{ color: COLORS.orange, marginRight: '12px', fontSize: '14px', marginTop: '2px' }} />
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  123 Galle Road, Colombo 03,<br />Sri Lanka
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  underline="none"
                  sx={{
                    color: COLORS.textSecondary,
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease',
                    '&:hover': { 
                      color: COLORS.orange,
                      transform: 'translateX(4px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {services.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  underline="none"
                  sx={{
                    color: COLORS.textSecondary,
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease',
                    '&:hover': { 
                      color: COLORS.orange,
                      transform: 'translateX(4px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {legalLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  underline="none"
                  sx={{
                    color: COLORS.textSecondary,
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease',
                    '&:hover': { 
                      color: COLORS.orange,
                      transform: 'translateX(4px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <IconButton
                aria-label="LinkedIn"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: COLORS.textSecondary,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  p: 1.5,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: 'white',
                    bgcolor: COLORS.orange,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <FaLinkedin size={18} />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: COLORS.textSecondary,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  p: 1.5,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: 'white',
                    bgcolor: COLORS.orange,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <FaTwitter size={18} />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: COLORS.textSecondary,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  p: 1.5,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: 'white',
                    bgcolor: COLORS.orange,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <FaFacebook size={18} />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: COLORS.textSecondary,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  p: 1.5,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: 'white',
                    bgcolor: COLORS.orange,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <FaInstagram size={18} />
              </IconButton>
            </Box>
            
            {/* Newsletter Signup */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 1.5 }}>
                Stay updated with our latest news
              </Typography>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.05)', 
                  p: 2, 
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
                  Newsletter coming soon!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Divider sx={{ mt: 6, mb: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: COLORS.textSecondary,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              © 2025 Swift Logistics Pvt Ltd. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                justifyContent: { xs: 'center', md: 'flex-end' },
                mt: { xs: 2, md: 0 }
              }}
            >
              <Link href="#" underline="none" sx={{ color: COLORS.textSecondary, fontSize: '0.875rem', '&:hover': { color: COLORS.orange } }}>
                Security
              </Link>
              <Link href="#" underline="none" sx={{ color: COLORS.textSecondary, fontSize: '0.875rem', '&:hover': { color: COLORS.orange } }}>
                Careers
              </Link>
              <Link href="#" underline="none" sx={{ color: COLORS.textSecondary, fontSize: '0.875rem', '&:hover': { color: COLORS.orange } }}>
                Support
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
