import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './sliceCounter';

export const store = configureStore({ 
    reducer: {
      counter: counterReducer
    }
});

export default store