import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
  TextField,
  useTheme,
  Grid,
  Badge,
  Chip,
  Stack,
  Container  // Added this import
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();
  const theme = useTheme();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 4
        }}
      >
        <Badge badgeContent={0} color="primary">
          <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
        </Badge>
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Your shopping bag is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Start adding items to your cart
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{
            borderRadius: '8px',
            px: 4,
            py: 1.5,
            textTransform: 'none'
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
        Your Shopping Bag ({totalItems})
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items Column */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    gap: 3
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: 2,
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: theme.palette.grey[100],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        maxWidth: '80%',
                        maxHeight: '80%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {item.category}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      size="small"
                      sx={{ border: `1px solid ${theme.palette.divider}` }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      sx={{
                        mx: 1,
                        width: 60,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.divider
                          }
                        }
                      }}
                      size="small"
                    />
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      size="small"
                      sx={{ border: `1px solid ${theme.palette.divider}` }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography variant="h6" sx={{ minWidth: 80, textAlign: 'right' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>

                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
              </React.Fragment>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                onClick={clearCart}
                startIcon={<DeleteIcon />}
                sx={{ color: 'error.main' }}
              >
                Clear Cart
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Order Summary
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>${totalPrice}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography color="success.main">Free</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography>Calculated at checkout</Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${totalPrice}</Typography>
              </Box>
            </Stack>

            <Button
              component={Link}
              to="/checkout"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                borderRadius: '8px',
                mb: 2,
                textTransform: 'none'
              }}
            >
              Proceed to Checkout
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalShippingIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Free shipping on orders over $50
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DiscountIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Discounts applied at checkout
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              <Link href="/" style={{ color: 'inherit' }}>
                Continue Shopping
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;