import { Grid ,  InputAdornment, IconButton, TextField} from '@material-ui/core';
import React from 'react';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const InputAuth = ({name, label, handleChange, autoFocus, half, type, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        autoFocus={autoFocus}
        xs={6}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
        
      />
    </Grid>
  );
};

export default InputAuth;