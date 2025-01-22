import { User } from '@repo/entities/user'
import { db, collection, getDocs } from '@repo/firebase-config/index'
import { Suspense } from 'react'
import { Box, Container, Typography } from '@repo/ui'
import { CardUser } from './_components/card-user'
import { DialogAddUser } from './_components/dialog-add-user'
import { Loader } from 'components/loader'

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
        paddingTop: { xs: 2, md: 8 },
        paddingBottom: { xs: 2, md: 8 },
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4'>User List</Typography>
        <DialogAddUser />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Suspense fallback={<Loader />}>
          <HomeWithServerDaa />
        </Suspense>
      </Box>
    </Container>
  )
}
