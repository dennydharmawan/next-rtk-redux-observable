import { ofType } from "redux-observable";
import {
  combineLatest,
  forkJoin,
  from,
  merge,
  Observable,
  timer,
  zip
} from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  distinctUntilChanged,
  map,
  mapTo,
  mergeMap,
  repeat,
  startWith,
  switchMap,
  takeUntil,
  tap,
  toArray
} from "rxjs/operators";

import { AnyAction } from "@reduxjs/toolkit";

import { MyEpic } from "../rootEpic";

const waitingIndicator$: MyEpic = (action$, state$) => {
  const jobStarted$ = action$.pipe(ofType('START_JOB'));
  const jobEnded$ = action$.pipe(ofType('END_JOB'));

  const SHOW_WAITING_INDICATOR = { type: 'SHOW_WAITING_INDICATOR' };
  const HIDE_WAITING_INDICATOR = { type: 'HIDE_WAITING_INDICATOR' };

  const processJob$ = jobStarted$.pipe(
    mergeMap((action) => {
      return ajax.getJSON(
        'https://jsonplaceholder.typicode.com/posts/' + action.id
      );
    }),
    map((result) => ({ type: 'END_JOB', payload: result }))
  );

  const showWaitingIndicator$ = jobStarted$.pipe(mapTo(SHOW_WAITING_INDICATOR));

  return merge(showWaitingIndicator$, processJob$);
};

// dispatch start_job and add the job to store,
// show loading indicator
// process the job,
// job finished,
// dispatch end_job and remove the job from store,
// check if there is job on store, otherwise hide the job

export default waitingIndicator$;
