import './Status.scss';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { projectsSetFineTuneStatus } from '../store/sliceProjects';
import lodash from 'lodash';

function Status() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const projects = useSelector(state => state?.projects?.projects);
  const server = useSelector(state => state.projects?.server);
  const fineTuneStatus = useSelector(state => state.projects.fineTuneStatus);

  console.log('fineTuneStatus', fineTuneStatus);

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
    dispatch(projectsSetFineTuneStatus(response.data));
  }

  useEffect(() => {
    getStatus();
  }, [])

  return (
    <div className='Status'>
      <h1>Status</h1>
      <h2 className='Edit__project-name'>{project?.project_name}</h2>
      {!lodash.isEmpty(fineTuneStatus) && <div className="Status__info-container">
        {fineTuneStatus?.fine_tuned_model && <div className='Status__finetuned-model-info'>
          <div className="Status__label-value">
            <div className="Status__label">Fine Tuned Model</div>
            <div className="Status__value">{fineTuneStatus.fine_tuned_model}</div>
          </div>  
          <div className="Status__label-value">
            <div className="Status__label">System Prompt</div>
            <div className="Status__value">{fineTuneStatus.systemPrompt}</div>
          </div>  
          <div className="Status__label-value">
            <div className="Status__label">User Prompt</div>
            <div className="Status__value">{fineTuneStatus.userPrompt}</div>
          </div>  
          </div>
        }
        </div>} 
    </div>
  )
}

export default Status