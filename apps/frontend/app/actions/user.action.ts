'use server'

import { User } from '@repo/entities/user'
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from '@repo/firebase-config/index'

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

export async function deleteUser({ id }: { id: string }) {
  try {
    await deleteDoc(doc(db, 'users', id))

    return {
      type: 'DELETE_USER_SUCCESS',
    }
  } catch (error) {
    console.log(error)
  }
}

export async function editUser({
  id,
  firstName,
  lastName,
  email,
}: {
  id: string | undefined
  firstName: string
  lastName: string
  email: string
}) {
  try {
    if (!id) {
      throw new Error('User ID is required for updating.')
    }

    const userDocRef = doc(db, 'users', id)
    await updateDoc(userDocRef, {
      firstName,
      lastName,
      email,
    })

    return {
      type: 'EDIT_USER_SUCCESS',
    }
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
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
