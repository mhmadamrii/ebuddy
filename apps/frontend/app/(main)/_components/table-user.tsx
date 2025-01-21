'use client'

import { useState } from 'react'
import { User } from '@repo/entities/user'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@repo/ui'

export function TableUser({ users }: { users: User[] }) {
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => {
    setIsVisible(prev => !prev)
  }

  return (
    <div style={{ border: '1px solid black', width: '100%' }}>
      <Button
        variant='contained'
        color='primary'
        onClick={toggleVisibility}
        sx={{ mb: 2 }}
      >
        {isVisible ? 'Hide Users' : 'Show Users'}
      </Button>

      {isVisible && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Age</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
