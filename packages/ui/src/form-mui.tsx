import { FormControl as FormControlMUI, FormControlProps } from '@mui/material'

export const FormControl = ({
  children,
  className,
  ...props
}: FormControlProps & { className?: string }) => {
  return (
    <FormControlMUI {...props} className={className}>
      {children}
    </FormControlMUI>
  )
}
