import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';

const initState = {
    server: '',
    newProject: {}
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
        }
    }
});

export const { projectsSetServer, projectsSetNewProject } = sliceProjects.actions;

export default sliceProjects.reducer;