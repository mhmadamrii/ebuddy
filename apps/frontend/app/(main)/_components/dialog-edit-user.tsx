'use client'

import * as React from 'react'

import { Loader } from 'components/loader'
import { User } from '@repo/entities/user'
import { setStatus } from 'store/slices/stateSlice'
import { TransitionProps } from '@repo/ui'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { addUser, editUser } from 'app/actions/user.action'
import { toast } from 'sonner'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from '@repo/ui'

const createUserSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export function DialogEditUser({ user }: { user: User }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isPending } = useSelector((state: any) => state.app_state)
  const [open, setOpen] = React.useState(false)
  const [valueInput, setValueInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditUser = async () => {
    const validation = createUserSchema.safeParse(valueInput)

    if (!validation.success) {
      const validate = validation.error.errors
      validate.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error.message)
        }, index * 800)
      })

      return
    }

    dispatch(setStatus(true))

    const result = await editUser({
      id: user.id,
      firstName: valueInput.firstName,
      lastName: valueInput.lastName,
      email: valueInput.email,
    })

    if (result?.type === 'EDIT_USER_SUCCESS') {
      toast.success('User added successfully')
      setValueInput({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
      })
      handleClose()
      dispatch(setStatus(false))
      router.refresh()
    }
  }

  React.useEffect(() => {
    if (user) {
      setValueInput({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: '33',
      })
    }
  }, [user])

  return (
    <React.Fragment>
      <Button
        variant='contained'
        sx={{ width: '100%' }}
        onClick={handleClickOpen}
      >
        Edit User
      </Button>

      <Dialog
        open={open}
        // @ts-expect-error: passing transition
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        maxWidth='md'
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: 2,
            }}
          >
            <TextField
              id='outlined-basic'
              label='First Name'
              variant='outlined'
              value={valueInput.firstName}
              disabled={isPending}
              onChange={e =>
                setValueInput({ ...valueInput, firstName: e.target.value })
              }
            />
            <TextField
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
              value={valueInput.lastName}
              disabled={isPending}
              onChange={e =>
                setValueInput({ ...valueInput, lastName: e.target.value })
              }
            />
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              type='email'
              value={valueInput.email}
              disabled={isPending}
              onChange={e =>
                setValueInput({ ...valueInput, email: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{ width: 100 }}
            variant={isPending ? 'outlined' : 'contained'}
            onClick={handleEditUser}
          >
            {isPending ? <Loader /> : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
