import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

type DropdownProps<T> = {
  options: T[];
  getName: (option: T) => string;
  currentValue: string;
  onUpdate: (newValue: string) => Promise<void>;
};

function Dropdown<T>({
  options,
  getName,
  currentValue,
  onUpdate,
}: DropdownProps<T>) {
  const [value, setValue] = useState(currentValue);

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    await onUpdate(newValue);
    setValue(newValue);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      variant='standard'
      size='small'
      style={{ width: '100%' }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={getName(option)}>
          {getName(option)}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
