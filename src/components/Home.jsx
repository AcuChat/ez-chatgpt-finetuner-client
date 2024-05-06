import './Home.scss';
import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

function Home() {
  const addProject = () => {
    alert ('add Project')
  }
  return (
    <div className='Home'>
      <h1 className="Home__title">Home</h1>
      <div className="Home__add-project">
        <Link to="/create">
          <IoMdAddCircleOutline className='Home__add-button' size={32} color="black"/>
        </Link>
        <div className="Home__right-label">Add Project</div>
      </div>
    </div>
  )
}

export default Home