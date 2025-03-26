import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(186, 185, 182)', // Main card background
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[6],
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Favorite Button */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 1,
          backgroundColor: 'rgba(255,255,255,0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.9)',
          },
        }}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      {/* Product Image - White background container */}
      <Box sx={{ 
        width: '100%',
        height: 240,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff' // White background for image area
      }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            height: 'auto',
            width: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            p: 2,
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </Box>

      {/* Product Content */}
      <CardContent sx={{ 
        flexGrow: 1, 
        px: 2.5, 
        pt: 2.5,
        backgroundColor: 'rgb(186, 185, 182)' // Matching main card color
      }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            mb: 1.5,
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.mode === 'dark' ? '#2D2D2D' : '#FFFFFF',
          }}
        />
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: '#000000' // Ensuring text is readable
          }}
        >
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through', mr: 1 }}
          >
            ${(product.price * 1.2).toFixed(2)}
          </Typography>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
        </Box>
      </CardContent>

      {/* Add to Cart Button */}
      <CardActions sx={{ 
        p: 2.5, 
        pt: 0,
        backgroundColor: 'rgb(186, 185, 182)' // Matching main card color
      }}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{
            py: 1.5,
            borderRadius: '24px',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;