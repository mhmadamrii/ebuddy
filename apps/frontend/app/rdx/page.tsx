'use client'

import { useSelector, useDispatch } from 'react-redux'
import {
  CounterState,
  decrement,
  increment,
} from '../../store/slices/counterSlice'

type R = {
  counter: CounterState
}

export default function Page() {
  const count = useSelector((s: R) => s.counter.value)
  const dispatch = useDispatch()
  console.log('count', count)
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
