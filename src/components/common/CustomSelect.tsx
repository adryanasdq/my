import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { FC } from 'react';

interface CustomSelectProps
  extends Omit<SelectProps, 'width' | 'label' | 'options'> {
  label: string;
  width: string;
  options: { value: string; label: string }[];
}

export const CustomSelect: FC<CustomSelectProps> = ({
  label,
  options,
  width,
  ...props
}) => {
  return (
    <FormControl sx={{ width: width }} required>
      <InputLabel>{label}</InputLabel>
      <Select {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
