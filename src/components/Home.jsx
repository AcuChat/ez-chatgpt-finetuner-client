import './Home.scss';
import React, { useEffect } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { projectsSetProjects } from '../store/sliceProjects';

function Home() {
  
  const dispatch = useDispatch();
  const projectsInfo = useSelector(state => state.projects);

  console.log('projectsInfo', projectsInfo)

  const getProjects = async () => {
    if (!projectsInfo.server) return;
    const response = await axios.get(projectsInfo.server + '/getProjects');
    const projects = response.data;
    for (let i = 0; i < projects.length; ++i) {
      const test = projectsInfo.projects.find(pi => pi.id === projects[i].id);
      if (!test) {
        dispatch(projectsSetProjects(projects));
        break;
      }
    }
  }

  useEffect(() => {
    getProjects();

  })

  return (
    <div className='Home'>
      <h1 className="Home__title">Home</h1>
      <div className="Home__add-project">
        <Link to="/create">
          <IoMdAddCircleOutline className='Home__add-button' size={32} color="black"/>
        </Link>
        <div className="Home__right-label">Add Project</div>
        <div className="Home__projects-list">
          {}
        </div>
      </div>
    </div>
  )
}

export default Home