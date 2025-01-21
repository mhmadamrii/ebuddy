import counterSlice from './slices/counterSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
})
