import './App.css'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  return (
    <div className="App">
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/purchase" element={<Purchase />}/>
        <Route path="/terms-and-conditions" element={<Terms />}/>
        <Route path="/privacy-policy" element={<Privacy />}/>
        <Route path="/password-reset" element={<PasswordReset />}/>
        <Route path="/packages" element={<Packages />}/>
        <Route path="/edit" element={<JoditWYSIWYG />}/>
      </Routes>
    </Router>
  </div>
  )
}

export default App
