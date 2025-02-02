import { User } from '@repo/entities/user'
import { Card } from '@repo/ui'
import { CardContent } from '@repo/ui'
import { Typography } from '@repo/ui'
import { DialogEditUser } from './dialog-edit-user'

export function CardUser({ users }: { users: User[] }) {
  return users.map(user => (
    <Card sx={{ width: { xs: 1, md: 1 / 4 } }} key={user.id}>
      <CardContent>
        <Typography variant='h5'>{user.firstName}</Typography>
        <Typography variant='body1'>{user.lastName}</Typography>
        <Typography variant='body2'>{user.email}</Typography>
        <DialogEditUser user={user} />
      </CardContent>
    </Card>
  ))
}
