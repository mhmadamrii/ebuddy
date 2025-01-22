'use server'

import { User } from '@repo/entities/user'
import { db, collection, addDoc, getDocs } from '@repo/firebase-config/index'

interface AddUserProps {
  firstName: string
  lastName: string
  email: string
  age: number
}

export async function addUser({
  firstName,
  lastName,
  email,
  age,
}: AddUserProps) {
  try {
    const newUser = await addDoc(collection(db, 'users'), {
      firstName,
      lastName,
      email,
      age,
    })

    if (newUser) {
      return {
        type: 'ADD_USER_SUCCESS',
      }
    }

    return {
      type: 'ADD_USER_FAILED',
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getUsers() {
  const usersRef = collection(db, 'users')
  const querySnapshot = await getDocs(usersRef)
  try {
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as User[]

    if (users) {
      return {
        users,
      }
    }

    return {
      type: 'GET_USERS_FAILED',
    }
  } catch (error: any) {
    console.log(error)
  }
}
