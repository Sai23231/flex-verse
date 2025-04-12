import { configureStore } from '@reduxjs/toolkit';
import userDetailsSliceReducer from './features/userDetailsSlice';

export default configureStore({
  reducer: {
    userDetails: userDetailsSliceReducer,
  },
});
