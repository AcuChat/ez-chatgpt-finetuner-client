import './Edit.scss';
import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import lodash from 'lodash';
import { projectsSetStatus } from '../store/sliceProjects';

function Edit() {
  const [ data, setData ] = useState(null);
  const [ pairsAvailable, setPairsAvailable ] = useState(true);

  const { id } = useParams();
  const projects = useSelector(state => state?.projects?.projects);
  const server = useSelector(state => state.projects?.server);

  const dispatch = useDispatch();

  console.log('projects', projects)
  const project = projects?.find(p => p.project_id === id);
  console.log('project', project)

  const getInput = async () => {
    if (!server) return;
    if (!project) return;

    let request = {
      url: server + "/nextAvailablePair",
      method: 'post',
      data: {
        projectId: project.project_id
      }
    }

    let response = await axios(request);

    /**
     * If no more available pairs 
     */

    if (lodash.isEmpty(response.data)) {
      request = {
        url: server + '/update-project-status',
        method: 'POST',
        data: {
          status: 'edited',
          projectId: project.project_id
        }
      }

      response = await axios(request);
      dispatch(projectsSetStatus({
        status: 'edited',
        projectId: project.project_id
      }))
      setPairsAvailable(false);
    }

    setData(response.data);
    
  }

  const handleSubmit = async () => {
    const request = {
      url: server + '/submission',
      method: 'post',
      data: {
        output: data.orig_output,
        responseId: data.response_id,
      }
    }

    const response = await axios(request);

    getInput();
  }


  useEffect(() => {
    if (data === null) getInput();
  })
  
  if (!pairsAvailable) {
    console.log('FineTune Navigating to Home')
    return <Navigate to="/"/>
  }

  return (
    <div className='Edit'>
      <h1>Edit</h1>
      <h2 className='Edit__project-name'>{project?.project_name}</h2>
      <div className="Edit__submit-button" onClick={handleSubmit}>Submit</div>
      <div className="Edit__editor-container">
        <div className="Edit__input">{data ? data.input : ''}</div>
        <textarea className="Edit__output" value={data ? data.orig_output : ''} onChange={(e) => {
          let origData = lodash.cloneDeep(data);
          origData.orig_output = e.target.value
          setData(origData);
        }}/>
      </div>
    </div>
  )
}

export default Edit