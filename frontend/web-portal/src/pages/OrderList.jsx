
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Chip, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Typography, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Pagination } from '@mui/material';
import { MdSearch, MdFileDownload, MdRemoveRedEye, MdCancel, MdTrackChanges } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

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

const OrderList = ({ onSidebarOpen }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

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
      if (dateStart && dateEnd) {
        const start = new Date(dateStart);
        const end = new Date(dateEnd);
        filtered = filtered.filter(o => {
          const d = new Date(o.orderDate);
          return d >= start && d <= end;
        });
      }
      setTotal(filtered.length);
      setOrders(filtered.slice((page - 1) * pageSize, page * pageSize));
      setLoading(false);
    }, 500);
  }, [status, search, dateStart, dateEnd, page, pageSize]);

  const handleExport = () => {
    toast.success('Exported to CSV! (placeholder)');
  };

  return (
    <Box className="min-h-screen bg-[#E9E9E9] flex flex-col items-center py-6 px-2" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <Box className="w-full max-w-6xl">
        {/* Header with sidebar open button */}
        <Box className="flex items-center mb-4">
          <Button onClick={onSidebarOpen} variant="outlined" sx={{ mr: 2, borderRadius: 2 }}>
            <span style={{ fontSize: 22, marginRight: 6 }}>☰</span> Menu
          </Button>
          <Typography variant="h4" className="font-bold text-[#001BB7]" style={{ fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: '2.2rem' }}>
            My Orders
          </Typography>
        </Box>
        <Box className="rounded-2xl p-6 shadow-lg bg-white mb-6">
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
            <TextField
              label="Start Date"
              type="date"
              size="small"
              value={dateStart}
              onChange={e => { setDateStart(e.target.value); setPage(1); }}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150, borderRadius: 2 }}
            />
            <TextField
              label="End Date"
              type="date"
              size="small"
              value={dateEnd}
              onChange={e => { setDateEnd(e.target.value); setPage(1); }}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150, borderRadius: 2 }}
            />
            <TextField
              label="Search Order ID or Recipient"
              size="small"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              InputProps={{ startAdornment: <MdSearch style={{ marginRight: 8 }} /> }}
              sx={{ minWidth: 220, borderRadius: 2 }}
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
          <TableContainer component={Paper} className="rounded-xl shadow-sm">
            <Table sx={{ minWidth: 650, fontFamily: 'Poppins, Nunito, Lato, sans-serif', fontSize: 16 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Recipient Name</TableCell>
                  <TableCell>Destination Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Estimated Delivery</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress size={32} />
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((row) => (
                    <TableRow key={row.orderId}>
                      <TableCell>
                        <Button
                          variant="text"
                          color="primary"
                          sx={{ textTransform: 'none', fontWeight: 700, color: '#001BB7' }}
                          onClick={() => toast.info(`Navigate to details for ${row.orderId}`)}
                        >
                          {row.orderId}
                        </Button>
                      </TableCell>
                      <TableCell>{row.orderDate}</TableCell>
                      <TableCell>{row.recipient}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={statusColors[row.status] || 'default'}
                          sx={{ borderRadius: 2, fontWeight: 600, fontSize: 14 }}
                        />
                      </TableCell>
                      <TableCell>{row.estimated}</TableCell>
                      <TableCell>
                        <Box className="flex gap-2">
                          <Button size="small" color="primary" variant="outlined" startIcon={<MdRemoveRedEye />} onClick={() => toast.info('View details')}>View</Button>
                          <Button size="small" color="info" variant="outlined" startIcon={<MdTrackChanges />} onClick={() => toast.info('Track order')}>Track</Button>
                          {row.status === 'Pending' && (
                            <Button size="small" color="error" variant="outlined" startIcon={<MdCancel />} onClick={() => toast.warn('Cancel order (placeholder)')}>Cancel</Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
            <Pagination
              count={Math.ceil(total / pageSize)}
              page={page}
              onChange={(e, p) => setPage(p)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
            <Typography variant="body2" color="text.secondary">
              Showing {orders.length} of {total} orders
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderList;
