import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ id, label, variant, type, value, width, onChange, name }) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      variant={variant}
      value={value}
      onChange={onChange}
      name={name} // Add the name prop here
      InputLabelProps={{
        shrink: true,
      }}
      margin='none'
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
