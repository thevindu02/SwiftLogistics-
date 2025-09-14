import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavBarAfter";
import axios from "axios";
import { Button, Snackbar, Alert } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";

const productImages = {
  "USB-C Charger": "/images/products/usb-c-charger.png",
  "Wireless Mouse": "/images/products/wireless-mouse.jpg",
  "Yoga Mat": "/images/products/yoga-mat.jpg",
  "Bluetooth Speaker": "/images/products/bluetooth-speaker.jpg",
  "Running Shoes": "/images/products/running-shoes.png",
  "Coffee Maker": "/images/products/coffee-maker.jpg",
  "Desk Lamp": "/images/products/desk-lamp.jpg",
  "Gaming Keyboard": "/images/products/gaming-keyboard.jpg",
  "Blender": "/images/products/blender.png",
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null); // holds cart object after add to cart
  const [adding, setAdding] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [order, setOrder] = useState(null); // holds order after checkout
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product");
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    setAdding(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8080/api/order/addtoCart',
        { items: [{ productId, quantity: 1 }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
      setSnackbar({ open: true, message: 'Added to cart!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to add to cart', severity: 'error' });
    } finally {
      setAdding(false);
    }
  };

  const handleCheckout = async () => {
    if (!cart) return;
    setCheckingOut(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:8080/api/order/checkout/${cart.cartId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(response.data);
      setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });
      setCart(null); // clear cart after checkout
    } catch (err) {
      setSnackbar({ open: true, message: 'Checkout failed', severity: 'error' });
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      <TopNavbar />
      <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Typography variant="h4" mb={4} align="center">
          Our Products
        </Typography>
        {cart && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Processing...' : 'Checkout'}
            </Button>
          </Box>
        )}
        {order && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Alert severity="success" sx={{ mb: 2, width: '100%', maxWidth: 400 }}>
              Order placed! Order ID: {order.orderId}
            </Alert>
            <Typography variant="subtitle1">Total Amount: Rs. {order.totalAmount.toLocaleString()}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>Items:</Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {order.items.map(item => (
                <li key={item.itemId}>
                  Product ID: {item.productId}, Quantity: {item.quantity}, Unit Price: Rs. {item.unitPrice}
                </li>
              ))}
            </ul>
          </Box>
        )}
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
              <Card
                sx={{
                  maxWidth: 300,
                  m: "auto",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      productImages[product.productName] ||
                      "/images/products/default.png"
                    }
                    alt={product.productName}
                    sx={{ objectFit: "contain", p: 2 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {product.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: "48px" }}
                    >
                      {product.productDescription}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      mt={1}
                      sx={{ fontWeight: "bold" }}
                    >
                      Rs. {product.productPrice.toLocaleString()}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 2 }}
                      fullWidth
                      disabled={adding}
                      onClick={() => handleAddToCart(product.productId)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
