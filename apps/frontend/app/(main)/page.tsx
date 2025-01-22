import { User } from '@repo/entities/user'
import { db, collection, getDocs } from '@repo/firebase-config/index'
import { Suspense } from 'react'
import { Box, Container, Typography } from '@repo/ui'
import { CardUser } from './_components/card-user'

async function HomeWithServerDaa() {
  const usersRef = collection(db, 'users')
  const querySnapshot = await getDocs(usersRef)

  const users = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as User[]

  return <CardUser users={users} />
}

export default function Home() {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h4' sx={{ mb: 2 }}>
        User List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <HomeWithServerDaa />
        </Suspense>
      </Box>
    </Container>
  )
}
