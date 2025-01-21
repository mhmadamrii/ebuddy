import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material'

export const Button = ({
  children,
  className,
  ...props
}: MUIButtonProps & { className?: string }) => {
  return (
    <MUIButton {...props} className={className}>
      {children}
    </MUIButton>
  )
}
