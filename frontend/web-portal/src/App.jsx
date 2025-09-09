import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import TopNavbar from './pages/TopNavbar.jsx';
import Footer from './pages/Footer.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SubmitOrder from './pages/SubmitOrder.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import OrderList from './pages/OrderList.jsx';
import Sidebar from './pages/Sidebar.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  // Only show Sidebar on main app pages (not Home, Login, Register)
  const showSidebar = window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register';

  return (
    <BrowserRouter>
      <TopNavbar />
      {showSidebar && (
        <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard onSidebarOpen={handleSidebarOpen} />} />
        <Route path="/submit-order" element={<SubmitOrder onSidebarOpen={handleSidebarOpen} />} />
        <Route path="/tracking" element={<OrderTracking onSidebarOpen={handleSidebarOpen} />} />
        <Route path="/order-list" element={<OrderList onSidebarOpen={handleSidebarOpen} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
