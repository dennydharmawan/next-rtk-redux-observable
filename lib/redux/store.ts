import { createEpicMiddleware } from "redux-observable";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import rootEpic from "./rootEpic";
import rootReducer from "./rootReducer";

const epicMiddleware = createEpicMiddleware();
const middleware = [...getDefaultMiddleware(), epicMiddleware];

const isDevelopmentMode = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: isDevelopmentMode,
});

epicMiddleware.run(rootEpic as any);

// @ts-ignore
if (isDevelopmentMode && module.hot) {
  // @ts-ignore
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type RootState = ReturnType<typeof store.getState>;

export default store;
