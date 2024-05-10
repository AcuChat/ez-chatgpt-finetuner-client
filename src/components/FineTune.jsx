import { useParams } from 'react-router-dom';
import './FineTune.scss';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';

function FineTune() {
  const { id } = useParams();
  const projects = useSelector(state => state?.projects?.projects);
  const server = useSelector(state => state.projects?.server);

  const dispatch = useDispatch();

  const [options, setOptions] = useState([
    {
      id: '2b592b0cefe998c1432dc000f2ea0dd6',
      label: 'Number Epochs',
      value: 10,
      automatic: true
    },
    {
      id: '2033ff1f82d1d15a630f86893ba70a09',
      label: 'Learning Rate Multiplier',
      value: 0.1,
      automatic: true
    },
    {
      id: '430eae655b6a54082b77f5b51ee3c96e',
      label: 'Batch Size',
      value: 64,
      automatic: true
    }
  ])

  const updateOption = (id, key, value) => {
    const copy = [...options];
    const option = copy.find(entry => entry.id === id);
    if (option) {
      option[key] = value
    }
    setOptions(copy);
  }

  console.log('projects', projects)
  const project = projects?.find(p => p.project_id === id);
  console.log('options', options)

  return (
    <div className='FineTune'>

      <h1>Fine Tune</h1>
      <h2 className='FineTune__project-name'>{project?.project_name}</h2>
      <div className="">
        {options.map(option => {
          console.log('mapped option', option)
          return (
            <div className="FineTune__options-container" key={option.id}>
              <div className="FineTune__label">{option.label}</div>
              <input type="number" step={option.id === '2033ff1f82d1d15a630f86893ba70a09' ? .1 : 1} className="FineTune__value" value={option.value} onChange={(e) => updateOption(option.id, 'value', e.target.value)}/>
              <input type="checkbox" className="FineTune__checkbox" checked={option.automatic} onChange={(e) => {
                console.log(e.target.checked)
                option.automatic = e.target.checked
              }}/>
              <div className="FineTune__automatic">Automatic</div>
            </div>
          )
        })}
      </div>
      <div className="FineTune__submit-button">Submit</div>
    </div>
  )
}

export default FineTune