import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ id, label, variant, type, value ,width, onChange }) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      variant={variant}
      value={value}
      onChange={onChange}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      sx={{
        width: `${width}`,
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px', 
        },
      }}
    />
  );
};

export default InputField;
