import { Container } from '@repo/ui'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      {/* @ts-expect-error: passing children */}
      {children}
    </Container>
  )
}
