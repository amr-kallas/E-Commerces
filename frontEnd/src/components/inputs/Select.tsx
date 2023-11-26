import { FormHelperText, Select as MuiSelect, SelectProps } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
type Select = {
  control: Control<any>
  name: string
  children: React.ReactNode
  message: string | null
} & SelectProps
const Select = ({ control, name, children, message, ...props }: Select) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <MuiSelect
            {...field}
            {...props}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            error={!!error}
          >
            {children}
          </MuiSelect>
          <FormHelperText error>
            {error ? message ?? error.message : ''}
          </FormHelperText>
        </>
      )}
    />
  )
}

export default Select
