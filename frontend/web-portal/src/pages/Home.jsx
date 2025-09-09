import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaMapMarkerAlt, FaRoad } from 'react-icons/fa';
import { Button } from '@mui/material';
import TopNavbar from './TopNavbar.jsx'; // Adjust import if needed

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: <FaBox size={32} className="text-bluePrimary" />,
    title: 'Order Management',
    desc: 'Easily submit and manage your delivery orders.',
  },
  {
    icon: <FaMapMarkerAlt size={32} className="text-bluePrimary" />,
    title: 'Real-Time Tracking',
    desc: 'Track every package from warehouse to doorstep.',
  },
  {
    icon: <FaRoad size={32} className="text-bluePrimary" />,
    title: 'Optimized Routes',
    desc: 'Faster deliveries with smart route planning.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="font-poppins bg-[#E9E9E9] min-h-screen w-full">
      <TopNavbar />
      {/* Hero Section with background image and overlay */}
  <section className="relative flex items-center justify-center min-h-[420px] md:min-h-[540px] px-6 py-8 md:py-10 mb-10">
        {/* Background illustration image */}
        <img
          src="/src/assets/courier-illustration.jpg"
          alt="Courier Delivery Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F8FF]/70 via-[#E9E9E9]/60 to-[#fff]/70 z-10" />
        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[#001BB7] shadow-lg">
            A trusted provider of <span className="text-[#FF8040]">courier services.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#001BB7] mb-8 shadow-sm">
            We deliver your products safely to your home in a reasonable time.
          </p>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#FF8040',
              borderRadius: '1.8rem',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1.15rem',
              px: 4,
              py: 1.5,
              boxShadow: '0 2px 10px rgba(255,128,64,0.15)',
              '&:hover': { bgcolor: '#0046FF', color: '#fff' },
            }}
            aria-label="Get Started"
            onClick={() => navigate('/login')}
          >
            Get started
          </Button>
        </motion.div>
      </section>

      {/* Features Section - Three horizontal cards with alternating backgrounds */}
      <section className="max-w-6xl mx-auto px-6 mb-20 flex flex-col gap-8 md:flex-row md:gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: idx * 0.18 }}
            className={`flex-1 rounded-2xl shadow-xl p-8 flex flex-row items-center gap-5 border-2 ${
              idx === 1
                ? 'bg-orange-100 border-orange-200'
                : 'bg-blue-50 border-blue-100'
            }`}
            role="region"
            aria-label={feature.title}
            tabIndex={0}
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="font-semibold text-2xl text-[#001BB7] mb-1">{feature.title}</h3>
              <p className="text-[#0046FF] text-lg">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
      {/* Add more sections if needed */}
    </main>
  );
}


