import React, { useState } from 'react';
import { Box, Button, FormLabel, Input, Select, Switch, Checkbox, Textarea, useToast, Heading, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import { Divider } from '@mui/material';
import { AutoComplete } from 'antd';
import { motion } from 'framer-motion';
import { MdOutlineSave, MdCancel, MdSend } from 'react-icons/md';
import { FaSignature } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import '../index.css'; // or './index.css' if in the same folder

const MotionBox = motion(Box);

const addressOptions = [
  { value: '123 Main St, Colombo' },
  { value: '456 Galle Rd, Galle' },
  { value: '789 Kandy Rd, Kandy' },
];

const fakeApiSubmit = (data) =>
  new Promise((resolve) => setTimeout(() => resolve({ trackingNumber: 'SL123456789' }), 1200));

const estimateDeliveryCost = (values) => {
  // Placeholder: returns a random cost
  return 500 + Math.round(Math.random() * 1000);
};

const initialForm = {
  clientName: 'Acme Corp',
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
  priority: 'Standard',
  insurance: false,
  signature: false,
};

const validate = (form) => {
  const errors = {};
  if (!form.contactNumber) errors.contactNumber = 'Contact number required';
  if (!form.email) errors.email = 'Email required';
  if (!form.description) errors.description = 'Description required';
  if (!form.weight) errors.weight = 'Weight required';
  if (!form.dimensions) errors.dimensions = 'Dimensions required';
  if (!form.value) errors.value = 'Value required';
  if (!form.recipientName) errors.recipientName = 'Recipient name required';
  if (!form.recipientPhone) errors.recipientPhone = 'Recipient phone required';
  if (!form.deliveryAddress) errors.deliveryAddress = 'Delivery address required';
  return errors;
};

const SubmitOrder = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [addressData, setAddressData] = useState(addressOptions);
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddressSearch = (value) => {
    setAddressData(
      !value ? addressOptions : addressOptions.filter((opt) => opt.value.toLowerCase().includes(value.toLowerCase()))
    );
    setForm((prev) => ({ ...prev, deliveryAddress: value }));
  };

  const handleEstimate = () => {
    setCost(estimateDeliveryCost(form));
  };

  const handleSubmit = async (saveDraft = false) => {
    const errs = validate(form);
    setErrors(errs);
    if (!saveDraft && Object.keys(errs).length > 0) {
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fakeApiSubmit(form);
      toast.success(`Order submitted! Tracking #: ${res.trackingNumber}`);
      setForm(initialForm);
      setCost(null);
    } catch (e) {
      toast.error('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-[#E9E9E9] py-8 px-2"
      fontFamily="'Poppins', 'Nunito', 'Lato', sans-serif"
    >
      <ToastContainer position="top-center" />
      <MotionBox
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={{ base: 4, md: 8 }}
        w={{ base: '100%', md: '700px' }}
        maxW="full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Heading
          as="h1"
          size="lg"
          mb={6}
          color="#001BB7"
          fontWeight="bold"
          className="text-3xl md:text-4xl text-center mb-8"
        >
          Submit New Order
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Client Info */}
          <MotionBox
            mb={6}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Heading as="h2" size="md" mb={2} color="#0046FF">
              Client Information
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl isReadOnly>
                <FormLabel>Client Name</FormLabel>
                <Input value={form.clientName} name="clientName" bg="#E9E9E9" borderRadius="lg" fontWeight="semibold" />
              </FormControl>
              <FormControl isInvalid={!!errors.contactNumber} isRequired>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                  borderRadius="lg"
                  bg="gray.50"
                  fontWeight="medium"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="client@email.com"
                  borderRadius="lg"
                  bg="gray.50"
                  fontWeight="medium"
                />
              </FormControl>
            </SimpleGrid>
          </MotionBox>
          <Divider my={4} />
          {/* Package Details */}
          <MotionBox
            mb={6}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Heading as="h2" size="md" mb={2} color="#0046FF">
              Package Details
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!errors.description} isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="e.g. Electronics, Books"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.weight} isRequired>
                <FormLabel>Weight (kg)</FormLabel>
                <Input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="e.g. 2.5"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.dimensions} isRequired>
                <FormLabel>Dimensions (L×W×H cm)</FormLabel>
                <Input
                  name="dimensions"
                  value={form.dimensions}
                  onChange={handleChange}
                  placeholder="e.g. 30×20×10"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.value} isRequired>
                <FormLabel>Value (LKR)</FormLabel>
                <Input
                  name="value"
                  value={form.value}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="e.g. 10000"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Special Handling Instructions</FormLabel>
                <Textarea
                  name="specialInstructions"
                  value={form.specialInstructions}
                  onChange={handleChange}
                  placeholder="e.g. Fragile, Keep upright"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
            </SimpleGrid>
          </MotionBox>
          <Divider my={4} />
          {/* Delivery Info */}
          <MotionBox
            mb={6}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heading as="h2" size="md" mb={2} color="#0046FF">
              Delivery Information
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!errors.recipientName} isRequired>
                <FormLabel>Recipient Name</FormLabel>
                <Input
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.recipientPhone} isRequired>
                <FormLabel>Recipient Phone</FormLabel>
                <Input
                  name="recipientPhone"
                  value={form.recipientPhone}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.deliveryAddress} isRequired>
                <FormLabel>Delivery Address</FormLabel>
                <AutoComplete
                  options={addressData}
                  style={{ width: '100%' }}
                  value={form.deliveryAddress}
                  onSearch={handleAddressSearch}
                  onChange={(value) => setForm((prev) => ({ ...prev, deliveryAddress: value }))}
                  placeholder="Start typing address..."
                  className="rounded-lg bg-gray-50"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Preferred Delivery Time</FormLabel>
                <Input
                  name="preferredTime"
                  value={form.preferredTime}
                  onChange={handleChange}
                  placeholder="e.g. 10:00 AM - 12:00 PM"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Delivery Instructions</FormLabel>
                <Textarea
                  name="deliveryInstructions"
                  value={form.deliveryInstructions}
                  onChange={handleChange}
                  placeholder="e.g. Leave at reception"
                  borderRadius="lg"
                  bg="gray.50"
                />
              </FormControl>
            </SimpleGrid>
          </MotionBox>
          <Divider my={4} />
          {/* Service Options */}
          <MotionBox
            mb={6}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Heading as="h2" size="md" mb={2} color="#0046FF">
              Service Options
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl>
                <FormLabel>Delivery Priority</FormLabel>
                <Select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  borderRadius="lg"
                  bg="gray.50"
                  color="#001BB7"
                  fontWeight="semibold"
                >
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                  <option value="Same-day">Same-day</option>
                </Select>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Insurance</FormLabel>
                <Switch
                  name="insurance"
                  isChecked={form.insurance}
                  onChange={handleChange}
                  colorScheme="orange"
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  name="signature"
                  isChecked={form.signature}
                  onChange={handleChange}
                  colorScheme="blue"
                  icon={<FaSignature />}
                >
                  Signature Required
                </Checkbox>
              </FormControl>
            </SimpleGrid>
            <Box mt={4} className="flex flex-col md:flex-row items-center gap-2">
              <Button
                onClick={handleEstimate}
                colorScheme="blue"
                variant="outline"
                borderRadius="lg"
                size="sm"
                mb={{ base: 2, md: 0 }}
              >
                Estimate Delivery Cost
              </Button>
              {cost && (
                <Box color="#FF8040" fontWeight="bold" fontSize="lg">
                  Estimated Cost: LKR {cost}
                </Box>
              )}
            </Box>
          </MotionBox>
          <Divider my={4} />
          {/* Action Buttons */}
          <HStack justify="center" spacing={4} mt={8}>
            <Button
              leftIcon={<MdSend />}
              colorScheme="blue"
              bg="#0046FF"
              color="white"
              borderRadius="lg"
              size="lg"
              type="submit"
              isLoading={loading}
              _hover={{ bg: '#001BB7' }}
              fontWeight="bold"
              px={8}
              fontSize="xl"
              shadow="md"
            >
              Submit Order
            </Button>
            <Button
              leftIcon={<MdOutlineSave />}
              colorScheme="orange"
              variant="solid"
              borderRadius="lg"
              size="lg"
              onClick={() => handleSubmit(true)}
              fontWeight="bold"
              px={8}
              fontSize="xl"
              shadow="md"
            >
              Save as Draft
            </Button>
            <Button
              leftIcon={<MdCancel />}
              colorScheme="gray"
              variant="outline"
              borderRadius="lg"
              size="lg"
              onClick={() => setForm(initialForm)}
              fontWeight="bold"
              px={8}
              fontSize="xl"
              shadow="md"
            >
              Cancel
            </Button>
          </HStack>
        </form>
      </MotionBox>
    </Box>
  );
};

export default SubmitOrder;
