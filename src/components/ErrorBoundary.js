import React, { Component } from 'react';
import { Typography, Button, Box, Paper, use } from '@mui/material';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Something went wrong.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRetry}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;