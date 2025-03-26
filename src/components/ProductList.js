import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Slider,
  useTheme,
  Divider
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

function ProductList({
  products = [],
  loading = false,
  categories = [],
  selectedCategory = 'all',
  handleCategoryChange,
  priceRange = [0, 1000],
  handlePriceChange,
  sortOption = 'default',
  handleSortChange,
  handleResetFilters
}) {
  const theme = useTheme();

  const sortOptions = [
    { value: 'default', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No products match your filters
        </Typography>
        <Button 
          variant="outlined" 
          sx={{ mt: 2 }}
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Controls */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3, 
        backgroundColor: 'rgba(191, 78, 48, 0.05)',
        border: '1px solid rgba(191, 78, 48, 0.1)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          alignItems: 'center',
          '& > *': {
            flex: '1 1 200px'
          }
        }}>
          {/* Category Filter */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <FilterAltIcon fontSize="small" color="primary" />
              <Typography variant="subtitle2">Category</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                sx={{ 
                  borderRadius: '24px',
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Price Range */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <FilterAltIcon fontSize="small" color="primary" />
              <Typography variant="subtitle2">Price Range</Typography>
            </Box>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              sx={{
                color: theme.palette.primary.main,
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${theme.palette.primary.light}`
                  },
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              ${priceRange[0]} - ${priceRange[1]}
            </Typography>
          </Box>

          {/* Sort Options */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <SortIcon fontSize="small" color="primary" />
              <Typography variant="subtitle2">Sort By</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={sortOption}
                onChange={handleSortChange}
                sx={{ 
                  borderRadius: '24px',
                  backgroundColor: theme.palette.background.paper
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Reset Button */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-end',
            height: '100%'
          }}>
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              sx={{
                borderRadius: '24px',
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary,
                height: '40px',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main
                }
              }}
              fullWidth
            >
              Reset All
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;