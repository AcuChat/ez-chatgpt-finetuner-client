import './Edit.scss';
import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Edit() {
  const [ input, setInput ] = useState('');
  const [ output, setOutput ] = useState('');

  const { id } = useParams();
  const projects = useSelector(state => state?.projects?.projects);
  const server = useSelector(state => state.projects?.server);

  console.log('projects', projects)
  const project = projects?.find(p => p.project_id === id);
  console.log('project', project)

  const getInput = async () => {
    if (!server) return;
    const request = {
      url: server + "/nextAvailablePair",
      method: 'post',
      data: {
        projectId: project.project_id
      }
    }

    const response = await axios(request);

    const input = response.data.input;

    setInput(input.startsWith('"') ? JSON.parse(input) : input);
    setOutput(response.data.orig_output);
    
  }
  useEffect(() => {
    if (!input) getInput();
  })
  
  return (
    <div className='Edit'>
      <h1>Edit</h1>
      <h2 className='Edit__project-name'>{project?.project_name}</h2>
      <div className="Edit__submit-button">Submit</div>
      <div className="Edit__editor-container">
        <div className="Edit__input">{input}</div>
        <textarea className="Edit__output" value={output} onChange={(e) => setOutput(e.target.value)}/>
      </div>
    </div>
  )
}

export default Edit