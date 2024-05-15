import './Status.scss';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

function Status() {
  const { id } = useParams();

  const projects = useSelector(state => state?.projects?.projects);
  const server = useSelector(state => state.projects?.server);

  const project = projects?.find(p => p.project_id === id);

  const getStatus = async () => {
    const request = {
      url: server + '/status',
      method: 'post',
      data: {
        projectId: id
      }
    }

    const response = await axios(request);
    console.log(response.data);
  }

  useEffect(() => {
    getStatus();
  })

  return (
    <div className='Status'>
      <h1>Status</h1>
      <h2 className='Edit__project-name'>{project?.project_name}</h2>
    </div>
  )
}

export default Status