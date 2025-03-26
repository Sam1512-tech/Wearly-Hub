import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Rating,
  Chip,
} from '@mui/material';
import { useCart } from '../context/CartContext';

function ProductDetails({ product }) {
  const { addToCart } = useCart();

  return (
    <Paper sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxHeight: 400, maxWidth: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Chip label={product.category} color="primary" sx={{ mb: 2 }} />
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={product.rating.rate}
              precision={0.5}
              readOnly
              sx={{ mr: 1 }}
            />
            <Typography variant="body2">
              {product.rating.rate} ({product.rating.count} reviews)
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => addToCart(product)}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductDetails;