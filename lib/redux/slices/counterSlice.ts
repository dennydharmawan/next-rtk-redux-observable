import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 0;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state = state + action.payload;

      return state;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state = state - action.payload;

      return state;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
