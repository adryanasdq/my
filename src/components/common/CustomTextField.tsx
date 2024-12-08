import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'name' | 'label'> {
  name: string;
  label: string;
  error?: boolean;
  helperText?: string;
}

export const CustomTextField: FC<CustomTextFieldProps> = ({
  error,
  helperText,
  ...props
}) => {
  return <TextField error={error} helperText={helperText} {...props} />;
};
