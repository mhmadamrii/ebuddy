import { Request, Response } from 'express'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { fr } from '../config/firebaseConfig'

const db = getFirestore(fr)

export const createUserData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { firstName, lastName, email, age } = req.body

    const newUser = await addDoc(collection(db, 'users'), {
      firstname: firstName,
      lastname: lastName,
      age: age,
    })

    res.status(201).json({ message: 'User created successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.', error })
  }
}

export const fetchUserData = (req: Request, res: Response) => {
  // Dummy user data
  const dummyUser = {
    id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
  }

  res.status(200).json({ success: true, data: dummyUser })
}

/**
 * Controller to update user data
 */
export const updateUserData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, newData } = req.body

    // Dummy logic for updating user data
    if (!userId || !newData) {
      res.status(400).json({ message: 'Missing required fields.' })
      return
    }

    // Simulating a database update
    console.log(`Updating user with ID: ${userId}`)
    console.log(`New data: ${JSON.stringify(newData)}`)

    res.status(200).json({ message: 'User data updated successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
