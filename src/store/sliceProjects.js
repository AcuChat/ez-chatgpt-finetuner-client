import { createSlice } from '@reduxjs/toolkit';

const initState = {
    server: ''
}

const sliceProjects = createSlice({
    name: 'projects',
    initialState: initState,
    reducers: {
        projectsSetServer: (state, action) => {
            state.server = action.payload;
            return state;
        }
    }
});

export const { projectsSetServer } = sliceProjects.actions;

export default sliceProjects.reducer;