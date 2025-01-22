import { Container } from '@repo/ui'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  if (accessToken?.value) {
    redirect('/')
  }
  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {/* @ts-expect-error */}
      {children}
    </Container>
  )
}
