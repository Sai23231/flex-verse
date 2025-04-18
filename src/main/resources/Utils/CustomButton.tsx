import React from 'react';

import { Button } from '@mui/material';

import type { ButtonProps } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StyledButtonProps extends ButtonProps {}

const CustomButton: React.FC<StyledButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="warning"
      size="large"
      {...props}
      sx={{
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        width: '250px',
        padding: '12px 24px',
        marginBottom: 1,
        ...props.sx, // Allow custom styles to be passed as well
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
