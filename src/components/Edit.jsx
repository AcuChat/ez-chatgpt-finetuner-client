import './Edit.scss';
import React from 'react'
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Edit() {
  const { id } = useParams();
  const projects = useSelector(state => state?.projects?.projects);
  if (!projects.length) {
    return <Navigate to="/"/>
  }

  console.log('projects', projects)
  const project = projects.find(p => p.project_id === id);
  console.log('project', project)
  return (
    <div className='Edit'>
      <h1>Edit</h1>
      <h2 className='Edit__project-name'>{project.project_name}</h2>
      <div className="Edit__submit-button">Submit</div>
    </div>
  )
}

export default Edit