import { Request, Response } from 'express'
import { fr } from '../config/firebaseConfig'
import { z } from 'zod'
import { User } from '@repo/entities/user'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'

const db = getFirestore(fr)

const createUserSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  age: z.number().min(0, { message: 'Age must be a non-negative number' }),
})

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().optional(),
})

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const usersRef = collection(db, 'users')
    const querySnapshot = await getDocs(usersRef)

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as User[]

    res.status(200).json({ users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.', error })
  }
}

export const createUserData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const result = createUserSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: 'Invalid request data',
        errors: result.error.issues,
      })
    }

    const { firstName, lastName, email, age } = result.data

    await addDoc(collection(db, 'users'), {
      firstName: firstName,
      lastName: lastName,
      email,
      age: age,
    })

    res.status(201).json({ message: 'User created successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.', error })
  }
}

export const updateUserData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const userId = req.params.id

    const result = updateUserSchema.safeParse(req.body)

    if (!result.success || !userId) {
      return res.status(400).json({
        message: 'Invalid request data',
        errors: result?.error?.issues ?? 'User ID is required',
      })
    }

    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, result.data)

    res.status(200).json({ message: 'User updated successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.', error })
  }
}

export const deleteUserData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const userId = req.params.id

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' })
    }

    const userRef = doc(db, 'users', userId)

    await deleteDoc(userRef)

    res.status(200).json({ message: 'User deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.', error })
  }
}
