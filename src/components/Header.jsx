import './Header.scss';
import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='Header'>
        <Link to="/"><IoHomeSharp size={32} color='grey'/></Link>
        <h1 className='Header__title'>EZ ChatGPT FineTuner</h1>

    </div>
  )
}

export default Header