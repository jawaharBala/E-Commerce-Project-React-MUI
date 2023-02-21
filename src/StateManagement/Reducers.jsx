import { createReducer } from "@reduxjs/toolkit";

const initialState = { 
    count: 100,
     isAuthenticated: false 
    };
export const customReducer = createReducer(initialState, {
  updateCount: (state, action) => {
    state.count = action.payload;
  },

  updateAuth:(state,action)=>{
    state.isAuthenticated = action.payload;
  }
});
