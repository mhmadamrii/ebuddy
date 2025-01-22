'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus } from 'store/slices/stateSlice'
import { loginFirebase, registerFirebase } from 'app/actions/auth.action'
import { Loader } from 'components/loader'
import { z } from 'zod'

import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  FormControl,
} from '@repo/ui'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const AuthSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        border: '1px solid black',
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* @ts-expect-error: passing children */}
          {children}
        </Box>
      )}
    </div>
  )
}

function FormInput({ type }: { type: string }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isPending } = useSelector((state: any) => state.app_state)

  const [valueInput, setValueInput] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    const result = AuthSchema.safeParse(valueInput)

    if (!result.success) {
      const validate = result.error.errors
      validate.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error.message)
        }, index * 800)
      })

      return
    }

    dispatch(setStatus(true))
    try {
      switch (type) {
        case 'Login':
          const login = await loginFirebase({
            email: valueInput.email,
            password: valueInput.password,
          })
          if (login?.type === 'LOGIN_SUCCESS') {
            router.push('/')
          } else {
            toast.error('failed to login')
          }
          break

        case 'Register':
          const register = await registerFirebase({
            email: valueInput.email,
            password: valueInput.password,
          })
          if (register?.type === 'REGISTER_SUCCESS') {
            router.push('/')
          } else {
            toast.error('failed to register')
          }
          break

        default:
          break
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      dispatch(setStatus(false))
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h4'>{isPending ? 'Loading...' : type}</Typography>
      <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          onChange={e =>
            setValueInput({ ...valueInput, email: e.target.value })
          }
          id='outlined-basic'
          label='Email'
          variant='outlined'
          value={valueInput.email}
          type='email'
        />
        <TextField
          onChange={e =>
            setValueInput({ ...valueInput, password: e.target.value })
          }
          id='outlined-basic'
          label='Password'
          variant='outlined'
          value={valueInput.password}
          type='text'
        />
        <Button
          disabled={isPending}
          onClick={handleSubmit}
          variant={isPending ? 'outlined' : 'contained'}
        >
          {isPending ? <Loader /> : 'Submit'}
        </Button>
      </FormControl>
    </Box>
  )
}

export default function Auth() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Login' {...a11yProps(0)} />
          <Tab label='Register' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FormInput type='Login' />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FormInput type='Register' />
      </CustomTabPanel>
    </div>
  )
}
