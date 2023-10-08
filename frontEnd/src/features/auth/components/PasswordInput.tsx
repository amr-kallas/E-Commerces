import { TextField, TextFieldProps } from "../../../components/inputs/TextField";
import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
type password = TextFieldProps<true>;

const PasswordInput = ({control,name,...props}:password) => {
  const [showPassword,setShowPassword]=useState(false)
  return (
    <TextField
    name={name}
    variant="outlined"
    control={control}
    label={'password'}
    type={showPassword?'password':'text'}
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            sx={{ p: 0 }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    {...props}
  />
  );
};

export default PasswordInput;
