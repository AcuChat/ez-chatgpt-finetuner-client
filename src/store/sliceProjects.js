import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';

const initState = {
    server: '',
    newProject: {},
    projects: []
}

const sliceProjects = createSlice({
    name: 'projects',
    initialState: initState,
    reducers: {
        projectsSetServer: (state, action) => {
            state.server = action.payload;
            return state;
        },
        projectsSetNewProject: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newProject[key] = value;
            }
            return state;
        },
        projectsResetNewProject: (state, action) => {
            state.newProject = {};
            return state;
        },
        projectsSetProjects: (state, action) => {
            state.projects = lodash.cloneDeep(action.payload);
            return state;
        },
        projectsSetStatus: (state, action) => {
            const { projectId, status } = action.payload;
            const project = state.projects.find(p => p.project_id === projectId);
            project.status = status;
            return state;
        }
    }
});

export const { projectsSetServer, projectsSetNewProject, projectsSetProjects, projectsSetStatus, projectsResetNewProject } = sliceProjects.actions;

export default sliceProjects.reducer;