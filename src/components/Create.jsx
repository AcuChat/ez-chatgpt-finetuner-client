import './Create.scss';
import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { projectsSetNewProject } from '../store/sliceProjects';
import Dropzone, {useDropzone} from 'react-dropzone'
import axios from 'axios';

import settings from '../../settings.json'

function Create() {
  const [ file, setFile ] = useState(null);

  const models = [
    'gpt-4-turbo',
    'gpt-3.5-turbo',
    'gpt-4',
    'gpt-4-32k'
  ]

  const dispatch = useDispatch();
  const projectInfo = useSelector(state => state.projects);

  const droppedFiles = acceptedFiles => {
    if (!acceptedFiles.length) return;
    const name = acceptedFiles[0]?.name;
    const loc = name.lastIndexOf('.');
    const extension = name.substring(loc+1);
    if (extension !== 'csv' && extension !== 'jsonl') return alert ('Error: File must be CSV or JSONL.');
    setFile(acceptedFiles[0])
  }

  const handleSubmit = async () => {
    if (!file) return alert("Error: missing file");
    if (!projectInfo?.newProject?.name) return alert ("Error: missing project name");
    const systemPrompt = projectInfo?.newProject?.systemPrompt ? projectInfo.newProject.systemPrompt : '';
    const userPrompt = projectInfo?.newProject?.userPrompt ? projectInfo.newProject.userPrompt : '';
    if (!userPrompt && !systemPrompt) return alert ("Error: must provide system prompt or user prompt");

    // Prepare form data
    const formData = new FormData();
    formData.append('name', projectInfo.newProject.name);
    formData.append('model', projectInfo.newProject.model);
    formData.append('systemPrompt', systemPrompt);
    formData.append('userPrompt', userPrompt);
    formData.append(`file1`, file);
  
    try {
      // Send form data to the server
      const response = await axios.post(settings.server + '/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading files: ', error);
    }
  }

  useEffect(() => {
    if (!projectInfo?.newProject?.model) dispatch(projectsSetNewProject({model: models[0]}))
  })

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
      {!file && <div className="Create__dropzone">
          <Dropzone onDrop={acceptedFiles => droppedFiles(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      }
      {
        file && <div className="Create__filename"><b>{file?.name}</b></div>
      }
      <select value={projectInfo?.newProject?.model ? projectInfo.newProject.model : models[0]} onChange={(e) => dispatch(projectsSetNewProject({model: e.target.value}))}>
        {models.map(model => {
          return (
            <option key={model} value={model}>{model}</option>
          )
        })}
      </select>
      <div className="button" onClick={handleSubmit}>Submit</div>
      <div className="button-outline">Clear</div>
    </div>
  )
}

export default Create