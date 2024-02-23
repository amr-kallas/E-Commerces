import { TextField, TextFieldProps } from "../../../components/inputs/TextField";

type Input = TextFieldProps<true>;

const NameInput = ({ control ,name,label,...props}:Input) => {
  return (
    <TextField
      name={name}
      variant="outlined"
      control={control}
      fullWidth
      {...props}
      label={label}
    />
  );
};

export default NameInput