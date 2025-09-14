import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavBarAfter";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  Stack,
  LinearProgress,
  Container,
  Paper,
  Avatar,
  ListItemAvatar,
  useTheme,
} from "@mui/material";
import {
  LocalShipping,
  CheckCircle,
  PendingActions,
  Cancel,
  ShoppingBag,
  CalendarToday,
  Payments,
} from "@mui/icons-material";

const statusConfig = {
  PENDING: { color: "warning", icon: <PendingActions /> },
  SHIPPED: { color: "info", icon: <LocalShipping /> },
  DELIVERED: { color: "success", icon: <CheckCircle /> },
  CANCELLED: { color: "error", icon: <Cancel /> },
  CREATED: { color: "default", icon: <PendingActions /> }, // Added default for CREATED status
};

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/api/order/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString("en-IN")}`;
  };

  const StatusChip = ({ status }) => {
    const config = statusConfig[status] || { color: "default", icon: null };
    return (
      <Chip
        icon={config.icon}
        label={status.replace(/_/g, " ")}
        color={config.color}
        variant="outlined"
        sx={{ fontWeight: 600, textTransform: "capitalize" }}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 4 }}>
        <LinearProgress />
        <Typography align="center" sx={{ mt: 2 }}>
          Loading your orders...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TopNavbar />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "'Poppins', 'Nunito', sans-serif",
            fontWeight: 700,
            color: theme.palette.primary.dark,
            mb: 2,
          }}
        >
          My Orders
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          View your order history and track current orders
        </Typography>
      </Paper>

      {error && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: "error.light" }}>
          <Typography align="center" color="error.contrastText">
            {error}
          </Typography>
        </Paper>
      )}

      {!loading && orders.length === 0 && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <ShoppingBag sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No orders yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your order history will appear here once you make a purchase.
          </Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        {orders.map(({ order, statusHistory }) => {
          // Safely handle orderId (convert to string and get last 8 characters)
          const orderIdStr = String(order.orderId || "");
          const shortOrderId =
            orderIdStr.length > 8
              ? orderIdStr.slice(-8).toUpperCase()
              : orderIdStr.toUpperCase();

          return (
            <Grid item xs={12} key={order.orderId}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <ShoppingBag />
                    </Avatar>
                  }
                  title={
                    <Typography variant="h6" component="div">
                      Order #{shortOrderId}
                    </Typography>
                  }
                  subheader={
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Box>
                  }
                  action={<StatusChip status={order.orderStatus} />}
                />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Total Amount:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.primary.dark,
                        fontWeight: 700,
                      }}
                    >
                      {formatCurrency(order.totalAmount)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 600, mt: 2 }}
                  >
                    Order Items
                  </Typography>
                  <List disablePadding>
                    {order.items.map((item) => (
                      <ListItem key={item.itemId} sx={{ py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            sx={{ bgcolor: "grey.100", color: "text.primary" }}
                          >
                            {item.quantity}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                              component="div"
                            >
                              {item.productName || `Product ${item.productId}`}
                            </Typography>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 0.5,
                              }}
                              component="div"
                            >
                              <StatusChip status={item.orderStatus} />
                              <Typography
                                variant="body2"
                                sx={{ ml: 2, color: "text.secondary" }}
                              >
                                {formatCurrency(item.unitPrice)} each
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Order Timeline
                  </Typography>
                  <Stack spacing={1.5}>
                    {statusHistory.map((status, index) => (
                      <Box
                        key={status.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 2,
                          bgcolor: index === 0 ? "action.selected" : "grey.50",
                          borderRadius: 2,
                          border:
                            index === 0
                              ? `1px solid ${theme.palette.primary.light}`
                              : "none",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {statusConfig[status.status]?.icon && (
                            <Box
                              sx={{
                                mr: 1.5,
                                color: `${
                                  statusConfig[status.status].color
                                }.main`,
                              }}
                            >
                              {statusConfig[status.status].icon}
                            </Box>
                          )}
                          <Typography
                            sx={{ fontWeight: index === 0 ? 600 : 500 }}
                            component="div"
                          >
                            {status.status.replace(/_/g, " ")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="div"
                        >
                          {new Date(status.updatedAt).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      </Container>
    </>
  );
}
