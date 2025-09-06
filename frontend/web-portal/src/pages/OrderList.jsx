import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Chip, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Typography, CircularProgress } from '@mui/material';
import { DatePicker, Table, Pagination, Input as AntdInput } from 'antd';
import { motion } from 'framer-motion';
import { MdSearch, MdFileDownload, MdRemoveRedEye, MdCancel, MdTrackChanges } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import 'antd/dist/reset.css';

const statusColors = {
  Pending: 'warning',
  'In Transit': 'info',
  Delivered: 'success',
  Failed: 'error',
};

const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'In Transit', label: 'In Transit' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Failed', label: 'Failed' },
];

const fakeOrders = Array.from({ length: 42 }, (_, i) => ({
  key: i + 1,
  orderId: `ORD${1000 + i}`,
  orderDate: `2025-08-${(i % 28) + 1}`,
  recipient: `Recipient ${i + 1}`,
  address: `${100 + i} Main St, City`,
  status: statusOptions[(i % 4) + 1].value,
  estimated: `2025-09-${(i % 28) + 1}`,
}));

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState([]);

  // Simulate API fetch
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...fakeOrders];
      if (status !== 'All') filtered = filtered.filter(o => o.status === status);
      if (search)
        filtered = filtered.filter(
          o => o.orderId.toLowerCase().includes(search.toLowerCase()) ||
            o.recipient.toLowerCase().includes(search.toLowerCase())
        );
      if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
        const [start, end] = dateRange;
        filtered = filtered.filter(o => {
          const d = new Date(o.orderDate);
          return d >= start.toDate() && d <= end.toDate();
        });
      }
      setTotal(filtered.length);
      setOrders(filtered.slice((page - 1) * pageSize, page * pageSize));
      setLoading(false);
    }, 500);
  }, [status, search, dateRange, page, pageSize]);

  // Placeholder for WebSocket real-time updates
  useEffect(() => {
    // Simulate real-time update
    // setInterval(() => { ... }, 10000);
  }, []);

  const handleExport = () => {
    toast.success('Exported to CSV! (placeholder)');
  };

  const columns = useMemo(() => [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      render: (id) => (
        <Button
          variant="text"
          color="primary"
          sx={{ textTransform: 'none', fontWeight: 700, color: '#001BB7' }}
          onClick={() => toast.info(`Navigate to details for ${id}`)}
        >
          {id}
        </Button>
      ),
    },
    { title: 'Order Date', dataIndex: 'orderDate' },
    { title: 'Recipient Name', dataIndex: 'recipient' },
    { title: 'Destination Address', dataIndex: 'address' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Chip
          label={status}
          color={statusColors[status] || 'default'}
          sx={{ borderRadius: 2, fontWeight: 600, fontSize: 14 }}
        />
      ),
    },
    { title: 'Estimated Delivery', dataIndex: 'estimated' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Box className="flex gap-2">
          <Button size="small" color="primary" variant="outlined" startIcon={<MdRemoveRedEye />} onClick={() => toast.info('View details')}>View</Button>
          <Button size="small" color="info" variant="outlined" startIcon={<MdTrackChanges />} onClick={() => toast.info('Track order')}>Track</Button>
          {record.status === 'Pending' && (
            <Button size="small" color="error" variant="outlined" startIcon={<MdCancel />} onClick={() => toast.warn('Cancel order (placeholder)')}>Cancel</Button>
          )}
        </Box>
      ),
    },
  ], []);

  return (
    <Box className="min-h-screen bg-[#E9E9E9] flex flex-col items-center py-6 px-2" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <motion.div initial="hidden" animate="visible" variants={sectionFade} className="w-full max-w-6xl">
        <Box className="rounded-2xl p-6 shadow-lg bg-white mb-6">
          <Typography variant="h4" className="mb-6 font-bold text-[#001BB7]" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: '2.2rem' }}>
            My Orders
          </Typography>
          <Box className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={e => { setStatus(e.target.value); setPage(1); }}
                input={<OutlinedInput label="Status" />}
                sx={{ borderRadius: 2 }}
              >
                {statusOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker.RangePicker
              className="rounded-lg border border-gray-200"
              onChange={setDateRange}
              style={{ minWidth: 220, height: 40 }}
              allowClear
            />
            <AntdInput
              prefix={<MdSearch />}
              placeholder="Search Order ID or Recipient"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="rounded-lg border border-gray-200"
              style={{ minWidth: 220, height: 40 }}
              allowClear
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdFileDownload />}
              sx={{ background: '#FF8040', borderRadius: 2, textTransform: 'none', fontWeight: 600, minWidth: 160 }}
              onClick={handleExport}
            >
              Export to CSV
            </Button>
          </Box>
          <Table
            columns={columns}
            dataSource={orders}
            loading={loading}
            pagination={false}
            rowKey="orderId"
            className="rounded-xl shadow-sm"
            scroll={{ x: true }}
            style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: 16 }}
          />
          <Box className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              showSizeChanger
              pageSizeOptions={[5, 10, 20, 50]}
              onChange={(p, s) => { setPage(p); setPageSize(s); }}
              className="rounded-lg"
            />
            <Typography variant="body2" color="text.secondary">
              Showing {orders.length} of {total} orders
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default OrderList;
