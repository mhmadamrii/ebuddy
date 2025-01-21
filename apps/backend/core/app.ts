import express, { Application } from 'express'
import userRoutes from '../routes/userRoutes'
import { add, subtract } from '@repo/entities/add'
import { User } from '@repo/entities/user'

const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend server is running!')
})

const user: User = {
  userId: '123456789',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: 30,
}

console.log(add(1, 2))

app.use('/api/v1', userRoutes)

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack)
  res.status(500).send({ success: false, message: 'Internal server error.' })
})

export default app
