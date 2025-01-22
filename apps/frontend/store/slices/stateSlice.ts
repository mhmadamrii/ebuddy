import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@repo/entities/user'

export interface AppState {
  isPending: boolean
  isSuccess: boolean
  error: string | null
  message: string | null
  users_data: User[]
  auth_data: any
}

const initialState: AppState = {
  isPending: false,
  isSuccess: false,
  error: null,
  message: null,
  auth_data: null,
  users_data: [],
}

export const stateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatus: (state: AppState, action: PayloadAction<boolean>) => {
      state.isPending = action.payload
    },
    setError: (state: AppState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setMessage: (state: AppState, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    setUsersData: (state: AppState, action: PayloadAction<User[]>) => {
      state.users_data = action.payload
    },
  },
})

export const { setError, setMessage, setStatus, setUsersData } = stateSlice.actions // prettier-ignore
export default stateSlice.reducer
