import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProducts } from '../utils/api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Default sorting (no change)
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortOption]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortOption('default');
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section - Fixed styling */}
      <Paper
        elevation={0}
        sx={{
          p: 6,
          mb: 6,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(191,78,48,0.1) 0%, rgba(91,140,90,0.1) 100%)',
          textAlign: 'center',
          backgroundColor: '#F8F4E9', // Light beige background
          color: '#2C2C2C', // Dark text
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          FASHION MADE FOR EVERYONE
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto' }}>
          WEAR. STYLE. REPEAT
        </Typography>
      </Paper>

      {/* Featured Products */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Featured Collection
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <ProductList
          products={filteredProducts}
          loading={loading}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          handleResetFilters={handleResetFilters}
        />
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default HomePage;