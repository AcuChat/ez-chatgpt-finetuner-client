import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './sliceProjects';

export const store = configureStore({ 
    reducer: {
      projects: projectsReducer
    }
});

export default store