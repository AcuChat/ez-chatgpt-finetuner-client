import './App.css'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import FineTune from './components/FineTune';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  return (
    <div className="App">
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/finetune" element={<FineTune />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App
