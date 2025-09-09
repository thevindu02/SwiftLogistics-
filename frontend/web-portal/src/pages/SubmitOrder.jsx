// SubmitOrder.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  Switch,
  Checkbox,
  Grid,
  Button,
  InputLabel,
} from '@mui/material';
import { AutoComplete } from 'antd';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COLORS = {
  deepBlue: '#001BB7',
  primaryBlue: '#0046FF',
  orange: '#FF8040',
  lightGrey: '#E9E9E9',
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const dummyAddressOptions = [
  { value: '123 Main Street, Colombo' },
  { value: '456 Lake Road, Kandy' },
  { value: '789 Ocean Drive, Galle' },
  { value: '10 Beach Avenue, Negombo' },
];

export default function SubmitOrder({ onSidebarOpen }) {
  // State for form
  const [form, setForm] = useState({
    clientName: 'Acme Corporation', // readonly, auto-filled example
    contactNumber: '',
    email: '',
    description: '',
    weight: '',
    dimensions: '',
    value: '',
    specialInstructions: '',
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    preferredTime: '',
    deliveryInstructions: '',
    deliveryPriority: 'Standard',
    insurance: false,
    signatureRequired: false,
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation check
  const validate = () => {
    const newErrors = {};
    // Required fields check
    if (!form.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Simple email regex check
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(form.email)) newErrors.email = 'Email is invalid';
    }
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.weight || Number(form.weight) <= 0) newErrors.weight = 'Weight must be positive';
    if (!form.dimensions.trim()) newErrors.dimensions = 'Dimensions required';
    if (!form.value || Number(form.value) < 0) newErrors.value = 'Value must be 0 or more';
    if (!form.recipientName.trim()) newErrors.recipientName = 'Recipient Name is required';
    if (!form.recipientPhone.trim()) newErrors.recipientPhone = 'Recipient Phone is required';
    if (!form.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery Address is required';
    return newErrors;
  };

  // Placeholder cost estimation function
  const estimateCost = () => {
    // Basic formula for example
    const base = 50;
    const weightCost = Number(form.weight) * 10;
    const priorityMultiplier =
      form.deliveryPriority === 'Express' ? 1.5 : form.deliveryPriority === 'Same-day' ? 2 : 1;
    const insuranceCost = form.insurance ? 20 : 0;
    return (base + weightCost + insuranceCost) * priorityMultiplier;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in required fields correctly.');
      return;
    }

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1500));
      const trackingNumber = 'TRK' + Math.floor(Math.random() * 1000000);
      toast.success(`Order submitted successfully! Tracking #: ${trackingNumber}`, {
        position: 'top-right',
        autoClose: 5000,
      });
      // Reset form but keep clientName
      setForm((prev) => ({
        ...prev,
        contactNumber: '',
        email: '',
        description: '',
        weight: '',
        dimensions: '',
        value: '',
        specialInstructions: '',
        recipientName: '',
        recipientPhone: '',
        deliveryAddress: '',
        preferredTime: '',
        deliveryInstructions: '',
        deliveryPriority: 'Standard',
        insurance: false,
        signatureRequired: false,
      }));
    } catch {
      toast.error('Submission failed. Please try again.');
    }
  };

  const handleSaveDraft = () => {
    toast.info('Draft saved (not really, demo only).');
  };

  const handleCancel = () => {
    // Reset form to initial state except clientName
    setForm((prev) => ({
      ...prev,
      contactNumber: '',
      email: '',
      description: '',
      weight: '',
      dimensions: '',
      value: '',
      specialInstructions: '',
      recipientName: '',
      recipientPhone: '',
      deliveryAddress: '',
      preferredTime: '',
      deliveryInstructions: '',
      deliveryPriority: 'Standard',
      insurance: false,
      signatureRequired: false,
    }));
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg"
      aria-label="Submit New Order Form"
    >
      {/* Header with sidebar open button */}
      <Box display="flex" alignItems="center" mb={3}>
        <Button onClick={onSidebarOpen} variant="outlined" sx={{ mr: 2, borderRadius: 2 }}>
          <span style={{ fontSize: 22, marginRight: 6 }}>☰</span> Menu
        </Button>
        <Typography variant="h4" fontWeight="700" color={COLORS.deepBlue}>
          Submit New Order
        </Typography>
      </Box>

      {/* Client Information */}
      <motion.section variants={fadeInVariants} className="mb-8" aria-labelledby="client-info-header">
        <Typography variant="h6" fontWeight={600} mb={2} id="client-info-header">
          Client Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Client Name"
              value={form.clientName}
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number *"
              value={form.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
              fullWidth
              variant="outlined"
              inputProps={{ inputMode: 'tel' }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email *"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
      </motion.section>

      {/* Package Details */}
      <motion.section variants={fadeInVariants} className="mb-8" aria-labelledby="package-details-header">
        <Typography variant="h6" fontWeight={600} mb={2} id="package-details-header">
          Package Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Description *"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Weight (kg) *"
              value={form.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              error={!!errors.weight}
              helperText={errors.weight}
              fullWidth
              variant="outlined"
              type="number"
              inputProps={{ min: 0, step: '0.01' }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Dimensions (L×W×H) cm *"
              value={form.dimensions}
              onChange={(e) => handleChange('dimensions', e.target.value)}
              error={!!errors.dimensions}
              helperText={errors.dimensions}
              fullWidth
              variant="outlined"
              placeholder="e.g. 30×20×15"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Value (for insurance) *"
              value={form.value}
              onChange={(e) => handleChange('value', e.target.value)}
              error={!!errors.value}
              helperText={errors.value}
              fullWidth
              variant="outlined"
              type="number"
              inputProps={{ min: 0, step: '0.01' }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Special Handling Instructions"
              value={form.specialInstructions}
              onChange={(e) => handleChange('specialInstructions', e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </motion.section>

      {/* Delivery Information */}
      <motion.section variants={fadeInVariants} className="mb-8" aria-labelledby="delivery-info-header">
        <Typography variant="h6" fontWeight={600} mb={2} id="delivery-info-header">
          Delivery Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Recipient Name *"
              value={form.recipientName}
              onChange={(e) => handleChange('recipientName', e.target.value)}
              error={!!errors.recipientName}
              helperText={errors.recipientName}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Recipient Phone *"
              value={form.recipientPhone}
              onChange={(e) => handleChange('recipientPhone', e.target.value)}
              error={!!errors.recipientPhone}
              helperText={errors.recipientPhone}
              fullWidth
              variant="outlined"
              required
              inputProps={{ inputMode: 'tel' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <AutoComplete
              options={dummyAddressOptions}
              value={form.deliveryAddress}
              onChange={(val) => handleChange('deliveryAddress', val)}
              onSearch={(val) => {
                // For demo, use same dummy options, in real scenario fetch suggestions here
              }}
              allowClear
              filterOption={(input, option) =>
                option && option.value ? option.value.toLowerCase().includes(input.toLowerCase()) : false
              }
              placeholder="Delivery Address *"
              style={{ width: '100%' }}
              aria-label="Delivery Address Autocomplete"
            />
            {errors.deliveryAddress && (
              <Typography color="error" variant="caption" mt={0.5} display="block">
                {errors.deliveryAddress}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Preferred Delivery Time"
              type="time"
              value={form.preferredTime}
              onChange={(e) => handleChange('preferredTime', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Delivery Instructions"
              value={form.deliveryInstructions}
              onChange={(e) => handleChange('deliveryInstructions', e.target.value)}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </motion.section>

      {/* Service Options */}
      <motion.section variants={fadeInVariants} className="mb-8" aria-labelledby="service-options-header">
        <Typography variant="h6" fontWeight={600} mb={2} id="service-options-header">
          Service Options
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="delivery-priority-label">Delivery Priority *</InputLabel>
              <Select
                labelId="delivery-priority-label"
                value={form.deliveryPriority}
                label="Delivery Priority *"
                onChange={(e) => handleChange('deliveryPriority', e.target.value)}
                required
              >
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Express">Express</MenuItem>
                <MenuItem value="Same-day">Same-day</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.insurance}
                  onChange={(e) => handleChange('insurance', e.target.checked)}
                  color="primary"
                />
              }
              label="Insurance Option"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.signatureRequired}
                  onChange={(e) => handleChange('signatureRequired', e.target.checked)}
                  color="primary"
                />
              }
              label="Signature Required"
            />
          </Grid>
        </Grid>
      </motion.section>

      {/* Estimated Delivery Cost */}
      <Box my={4}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Estimated Delivery Cost: ₹ {estimateCost().toFixed(2)}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" gap={3} flexWrap="wrap" justifyContent="flex-start" mb={6}>
        <Button
          variant="contained"
          sx={{ bgcolor: COLORS.primaryBlue, borderRadius: 3, px: 5, py: 1.5, fontWeight: 600 }}
          onClick={handleSubmit}
        >
          Submit Order
        </Button>
        <Button variant="outlined" sx={{ borderRadius: 3, px: 5, py: 1.5, fontWeight: 600 }} onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button variant="text" sx={{ px: 5, py: 1.5, fontWeight: 600, color: COLORS.orange }} onClick={handleCancel}>
          Cancel
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
}
