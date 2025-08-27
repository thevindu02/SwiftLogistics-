
import React from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaMapMarkerAlt, FaRoad } from 'react-icons/fa';
import { Button } from '@mui/material';
import TopNavbar from './TopNavbar.jsx';
import Footer from './Footer.jsx';


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
  return (
    <>
      <TopNavbar />
      <main className="font-poppins bg-lightGrey min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-white rounded-3xl shadow-soft mb-10" aria-label="Hero">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blueDark mb-4 leading-tight">
              Seamless Delivery, Real-Time Tracking
            </h1>
            <p className="text-lg text-blueDark mb-6 max-w-md">
              SwiftTrack revolutionizes last-mile delivery for e-commerce businesses, ensuring fast, reliable, and transparent logistics from start to finish.
            </p>
            <div className="flex gap-4">
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#0046FF',
                  borderRadius: '2rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
                aria-label="Get Started"
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#FF8040',
                  color: '#FF8040',
                  borderRadius: '2rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#FF8040', color: '#fff' },
                }}
                aria-label="Track an Order"
              >
                Track an Order
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-bluePrimary via-blueDark to-lightGrey shadow-soft flex items-center justify-center">
              {/* Add an illustration or image here */}
            </div>
          </motion.div>
        </section>

        {/* Features Section - Horizontal Cards */}
        <section className="flex flex-col md:flex-row gap-6 px-6 mb-10" aria-label="Features">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex-1 bg-white rounded-2xl shadow-soft p-8 flex flex-row items-center gap-6"
              role="region"
              aria-label={feature.title}
              tabIndex={0}
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-xl text-blueDark mb-2">{feature.title}</h3>
                <p className="text-blueDark">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Add more sections as needed, following the same design principles */}
      </main>
      <Footer />
    </>
  );
}

