import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  console.log(accessToken)
  if (!accessToken?.value) {
    redirect('/auth')
  }
  return <>{children}</>
}
