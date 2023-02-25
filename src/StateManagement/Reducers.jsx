import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  isAuthenticated: false,
};
export const customReducer = createReducer(initialState, {
  updateProducts: (state, action) => {
    state.products = action.payload;
  },

  updateAuth: (state, action) => {
    state.isAuthenticated = action.payload;
  },
  updateCart: (state, action) =>{
    state.cart = action.payload;
  },

});

