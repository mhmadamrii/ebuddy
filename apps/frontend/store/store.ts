import counterSlice from './slices/counterSlice'
import stateSlice from './slices/stateSlice'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    counter: counterSlice,
    app_state: stateSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof configureStore>
