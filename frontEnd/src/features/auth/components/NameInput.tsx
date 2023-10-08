import { TextField, TextFieldProps } from "../../../components/inputs/TextField";

type Input = TextFieldProps<true>;

const NameInput = ({ control ,name,...props}:Input) => {
  return (
    <TextField
      name={name}
      variant="outlined"
      control={control}
      label={name}
      fullWidth
      {...props}
    />
  );
};

export default NameInput