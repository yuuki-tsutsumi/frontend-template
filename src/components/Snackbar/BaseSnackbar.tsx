import { FC } from 'react';
import { Alert, Snackbar, SnackbarProps } from '@mui/material';

type BaseSnackbarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  color?: 'error' | 'warning' | 'info' | 'success';
  bgColor?: string;
} & Omit<SnackbarProps, 'message' | 'autoHideDuration' | 'onClose'>;

export const BaseSnackbar: FC<BaseSnackbarProps> = ({
  open,
  setOpen,
  message,
  severity = 'info',
  color = 'info',
  bgColor,
  ...restProps
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      {...restProps}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        color={color}
        sx={{ width: '100%' }}
        style={{ backgroundColor: bgColor }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
