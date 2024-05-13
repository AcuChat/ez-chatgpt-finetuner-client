import './Status.scss';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

function Status() {
  const { id } = useParams();

  const projects = useSelector(state => state?.projects?.projects);
  const server = useSelector(state => state.projects?.server);

  const project = projects?.find(p => p.project_id === id);

  

  return (
    <div className='Status'>
      <h1>Status</h1>
      <h2 className='Edit__project-name'>{project?.project_name}</h2>
    </div>
  )
}

export default Status