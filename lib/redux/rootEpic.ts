import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs/operators";

import { AnyAction } from "@reduxjs/toolkit";

import counterEpic from "./epics/counterEpic";
import displayLoadingEpic from "./epics/displayLoadingEpic";
import pingPongEpic from "./epics/pingPongEpic";
import { RootState } from "./store";

const epics = [pingPongEpic, displayLoadingEpic, counterEpic];
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
