import { ofType } from "redux-observable";
import { combineLatest, forkJoin, merge, Observable, timer, zip } from "rxjs";
import {
  distinctUntilChanged,
  map,
  mapTo,
  repeat,
  startWith,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";

import { AnyAction } from "@reduxjs/toolkit";

import { MyEpic } from "../rootEpic";

const showLoadingEpic$: MyEpic = (action$) => {
  const fetchingStarted$ = action$.pipe(ofType('START_FETCHING'));
  const fetchingEnded$ = action$.pipe(ofType('END_FETCHING'));
  const spinnerShown$ = action$.pipe(ofType('SHOW_SPINNER'));

  const SHOW_SPINNER = { type: 'SHOW_SPINNER' };
  const HIDE_SPINNER = { type: 'HIDE_SPINNER' };
  const TIMEOUT_SPINNER = { type: 'TIMEOUT_SPINNER' };

  const spinnerDelay = 1000; // show spinner if request at least takes 1s
  const spinnerTimeout = 4000; // show spinner for at least 4s after shown regardless the request is finished

  const showSpinner$ = fetchingStarted$.pipe(
    switchMap(() => {
      return timer(spinnerDelay).pipe(
        mapTo({ type: 'SHOW_SPINNER' }),
        takeUntil(fetchingEnded$)
      );
    })
  );

  const timeoutSpinner$ = spinnerShown$.pipe(
    switchMap(() => {
      return timer(spinnerTimeout).pipe(mapTo({ type: 'TIMEOUT_SPINNER' }));
    })
  );

  const hideSpinner$ = zip(fetchingEnded$, timeoutSpinner$).pipe(
    mapTo(HIDE_SPINNER)
  );

  return merge(showSpinner$, timeoutSpinner$, hideSpinner$).pipe(
    tap((action) => {
      console.log(action);
      return action;
    })
  );
};

export default showLoadingEpic$;

//https://stackoverflow.com/questions/56356053/loading-indication-with-a-delay-and-anti-flickering-in-rxjs/56361092
