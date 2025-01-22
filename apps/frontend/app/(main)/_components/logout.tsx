'use client'

import { Button } from '@repo/ui'
import { logout } from 'app/actions/auth.action'

export function Logout() {
  return (
    <Button
      variant='contained'
      color='error'
      sx={{ height: 40 }}
      onClick={() => logout()}
    >
      Logout
    </Button>
  )
}
