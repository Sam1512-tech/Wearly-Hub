import React, { useState } from 'react'; 
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stepper,
  Step,
  StepLabel,
  useTheme,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping', 'Payment', 'Review'];

function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
  
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <Typography>
            {currentUser?.email}
            <br />
           
            123 Main St, Anytown, USA
          </Typography>
        </Paper>
      )}

      {activeStep === 1 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          <Typography>
          
            Credit Card ending in ****4242
          </Typography>
        </Paper>
      )}

      {activeStep === 2 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.title}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="h6">${totalPrice}</Typography>
            </ListItem>
          </List>
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 2 }}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default CheckoutPage;
