import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs/operators";

import { AnyAction } from "@reduxjs/toolkit";

import appInitializationEpic from "./epics/appInitializationEpic";
import counterEpic from "./epics/counterEpic";
import pingPongEpic from "./epics/pingPongEpic";
import showLoadingEpic from "./epics/showLoadingEpic";
import waitingIndicatorEpic from "./epics/waitingIndicatorEpic";
import { RootState } from "./store";

const epics = [
  pingPongEpic,
  showLoadingEpic,
  counterEpic,
  appInitializationEpic,
  waitingIndicatorEpic,
];
export type MyEpic = Epic<AnyAction, AnyAction, RootState>;
const dependencies = () => {};

const rootEpic: MyEpic = (action$, store$) =>
  combineEpics(...epics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);

      return source;
    })
  );

export default rootEpic;
