import { TextField, TextFieldProps } from '@mui/material'

export const Input = ({
  className,
  ...props
}: TextFieldProps & { className?: string }) => {
  return <TextField {...props} className={className} />
}
