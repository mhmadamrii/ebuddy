'use server'

import { cookies } from 'next/headers'
import { User } from '@repo/entities/user'
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@repo/firebase-config/index'

interface AuthProps {
  email: string
  password: string
}

export async function loginFirebase({ email, password }: AuthProps) {
  try {
    const userCredential = (await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )) as unknown as User

    if (userCredential.user.accessToken) {
      const cookieStore = await cookies()
      cookieStore.set('accessToken', userCredential.user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })
      return {
        type: 'LOGIN_SUCCESS',
      }
    }

    return {
      type: 'LOGIN_FAILED',
    }
  } catch (error: any) {
    console.log(error)
  }
}

export async function registerFirebase({ email, password }: AuthProps) {
  try {
    const userCredential = (await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )) as unknown as User

    if (userCredential.user.accessToken) {
      const cookieStore = await cookies()
      cookieStore.set('accessToken', userCredential.user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })
      return {
        type: 'REGISTER_SUCCESS',
      }
    }

    return {
      type: 'REGISTER_FAILED',
    }
  } catch (error: any) {
    console.log(error)
  }
}

export async function logout() {
  try {
    ;(await cookies()).set('accessToken', '')
    await signOut(auth)
  } catch (error: any) {
    console.log(error)
  }
}
