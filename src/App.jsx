import './App.css'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  return (
    <>
      <div className='text-blue-600 cursor-pointer' onClick={() => dispatch(counterIncrement())}>+</div>
      <div>{count}</div>
      <div className='text-blue-600 cursor-pointer' onClick={() => dispatch(counterDecrement())}>-</div>
      <input type="number" onChange={e => dispatch(counterSetValue(e.target.value))} />
    </>
  )
}

export default App
