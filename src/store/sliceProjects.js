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
        projectsSetProjects: (state, action) => {
            state.projects = lodash.cloneDeep(action.payload);
            return state;
        }
    }
});

export const { projectsSetServer, projectsSetNewProject, projectsSetProjects } = sliceProjects.actions;

export default sliceProjects.reducer;