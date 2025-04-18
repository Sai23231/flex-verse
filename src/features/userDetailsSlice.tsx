import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser') || '{}'),
  },
  reducers: {
    setLoggedInUserDetails: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
