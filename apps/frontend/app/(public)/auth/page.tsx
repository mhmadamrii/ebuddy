'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  FormControl,
} from '@repo/ui'

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@repo/firebase-config/index'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

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
  const [valueInput, setValueInput] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    if (!valueInput.email || !valueInput.password) {
      toast.error('Please fill in all fields')
      return
    }
    try {
      if (type === 'Login') {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          valueInput.email,
          valueInput.password,
        )
      } else {
        console.log('register', valueInput)
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          valueInput.email,
          valueInput.password,
        )
        if (userCredential.user.accessToken) {
          toast.success('Login Successful')
        }

        // set redux persist access token
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h4'>{type}</Typography>
      <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          onChange={e =>
            setValueInput({ ...valueInput, email: e.target.value })
          }
          id='outlined-basic'
          label='Email'
          variant='outlined'
          value={valueInput.email}
        />
        <TextField
          onChange={e =>
            setValueInput({ ...valueInput, password: e.target.value })
          }
          id='outlined-basic'
          label='Password'
          variant='outlined'
          value={valueInput.password}
        />
        <Button onClick={handleSubmit} variant='contained'>
          Submit
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
