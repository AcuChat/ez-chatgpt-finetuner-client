import './App.css'

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import FineTune from './components/FineTune';
import AugmentData from './components/AugmentData';
import Header from './components/Header';

import settings from '../settings.json'
import { projectsSetServer } from './store/sliceProjects';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)

  useEffect(() => {
    dispatch(projectsSetServer(settings?.server));
  }, [])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/finetune" element={<FineTune />} />
        <Route path="/augment-data" element={<AugmentData />} />
      </Routes>
   
  </div>
  )
}

export default App
