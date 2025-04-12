import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar, Typography } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  status?: string;
  onClose: () => void;
  title: string;
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { open, message, onClose, title } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={
        <div>
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {message}
          </Typography>
        </div>
      }
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default Notification;
