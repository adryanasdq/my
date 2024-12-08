import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

interface CustomButtonProps extends ButtonProps {
  label: string;
}

export const CustomButton: FC<CustomButtonProps> = ({ label, ...props }) => {
  return <Button {...props}>{label}</Button>;
};
