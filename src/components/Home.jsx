import './Home.scss';
import React, { useEffect } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { projectsSetProjects } from '../store/sliceProjects';
import lodash from 'lodash';
import { RiDeleteBinLine } from "react-icons/ri";

function Home() {
  
  const dispatch = useDispatch();
  const projectsInfo = useSelector(state => state.projects);
  const server = useSelector(state => state.server);

  console.log('projectsInfo', projectsInfo)

  const getProjects = async () => {
    if (!projectsInfo.server) return;
    const response = await axios.get(projectsInfo.server + '/getProjects');
    const projects = response.data;
    const localProjects = projectsInfo.projects;
    const test = lodash.isEqual(projects, localProjects);
    if (test) return;

    dispatch(projectsSetProjects(projects));
  }

  const handleDelete = async projectId => {
    let request = {
      url: server + '/delete',
      method: 'post',
      data: {
        projectId
      }
    }

    try {
      let response = await axios(request);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProjects();

  })

  return (
    <div className='Home'>
      <h1 className="Home__title">Projects</h1>
      <div className="Home__projects-container">
        <div className="Home__add-project">
          <Link to="/create">
            <IoMdAddCircleOutline className='Home__add-button' size={32} color="black"/>
          </Link>
          <div className="Home__right-label">Add Project</div>
        </div>
        <div className="Home__projects-list">
            {projectsInfo?.projects.map(pi => {
              let url = '/';
              let buttonName = 'View';

              switch (pi.status) {
                case 'creating':
                case 'created':
                  url = `/edit/${pi.project_id}`;
                  buttonName = 'Edit';
                  break;
                case 'edited':
                  url = `/finetune/${pi.project_id}`;
                  buttonName = 'Fine Tune'
                  break;
                case 'finetuning':
                  url = `/status/${pi.project_id}`
                  buttonName = 'Status'
                  break;
              }
              return (
                <div className="Home__project" key={pi.project_id}>
                   <Link to={url}>
                    <div className="Home__project-button">{buttonName}</div>
                  </Link>
                  
                  <div className="Home__project-name">{pi.project_name}</div>
                  <div className="Home__action-container">
                  <RiDeleteBinLine color='red' size={24} onClick={() => handleDelete(pi.project_id)}/>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Home