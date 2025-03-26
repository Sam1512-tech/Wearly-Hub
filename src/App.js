import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './components/PrivateRoute';
import { Container } from '@mui/material';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  return (
    <CartProvider>
      <Routes>
        {/* Routes with regular Navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Container
              sx={{
                mt: 4,
                minHeight: 'calc(100vh - 120px)',
                py: 3,
                borderRadius: 2,
              }}
              maxWidth="xl"
            >
              <Routes>
                <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/signup" replace />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </>
        } />

        {/* Auth routes with Navbar hiding cart icon */}
        <Route path="/login" element={
          <>
            <Navbar hideCartIcon />
            <LoginPage />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar hideCartIcon />
            <SignupPage />
          </>
        } />
      </Routes>
    </CartProvider>
  );
}

export default App;