import { combineReducers } from "@reduxjs/toolkit";

import counterReducers from "./slices/counterSlice";
import jobQueueReducers from "./slices/jobQueueSlice";

const rootReducer = combineReducers({
  counter: counterReducers,
  jobQueue: jobQueueReducers,
});

export type MyState = ReturnType<typeof rootReducer>;

export default rootReducer;
