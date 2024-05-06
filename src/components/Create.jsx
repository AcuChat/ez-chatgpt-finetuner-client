import './Create.scss';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { projectsSetNewProject } from '../store/sliceProjects';

function Create() {
  const dispatch = useDispatch();
  const projectInfo = useSelector(state => state.projects);

  return (
    <div className='Create'>
      <h1>Create</h1>
      <input type="text" placeholder='Project Name' 
        value={projectInfo?.newProject?.name ? projectInfo.newProject.name : ''} 
        onChange={(e) => dispatch(projectsSetNewProject({name: e.target.value}))}
      />
      <textarea placeholder='System Prompt' rows={10}
        value={projectInfo?.newProject?.systemPrompt ? projectInfo.newProject.systemPrompt : ''} 
        onChange={(e) => dispatch(projectsSetNewProject({systemPrompt: e.target.value}))}
      />
      <input type="text" placeholder='Prepended User Prompt'
        value={projectInfo?.newProject?.userPrompt ? projectInfo.newProject.userPrompt : ''} 
        onChange={(e) => dispatch(projectsSetNewProject({userPrompt: e.target.value}))}
      />
      <div className="Create__dropzone">
        Drop Zone
      </div>
      <div className="button">Submit</div>
      <div className="button-outline">Clear</div>
    </div>
  )
}

export default Create