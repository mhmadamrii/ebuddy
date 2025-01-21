import { User } from '@repo/entities/user'
import { db, collection, getDocs } from '@repo/firebase-config/index'
import { Suspense } from 'react'
import { Container, Typography } from '@repo/ui'
import { TableUser } from './_components/table-user'

async function HomeWithServerDaa() {
  const usersRef = collection(db, 'users')
  const querySnapshot = await getDocs(usersRef)

  const users = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as User[]

  return <TableUser users={users} />
}

export default function Home() {
  return (
    <Container
      sx={{
        // border: '1px solid blue',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <Typography variant='h4' sx={{ mb: 2 }}>
        User List
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeWithServerDaa />
      </Suspense>
    </Container>
  )
}
