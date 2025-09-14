import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// 1. Create a theme with Poppins
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

// 2. Render the app with ThemeProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* optional: normalize styles */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
