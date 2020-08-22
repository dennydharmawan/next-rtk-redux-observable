import { combineReducers } from "@reduxjs/toolkit";

import counterReducers from "./slices/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducers,
});

export type MyState = ReturnType<typeof rootReducer>;

export default rootReducer;
