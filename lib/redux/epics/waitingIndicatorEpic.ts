import { ofType } from "redux-observable";
import { EMPTY, iif, merge, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  mapTo,
  mergeMap,
  share,
  tap,
  withLatestFrom
} from "rxjs/operators";

import { MyEpic } from "../rootEpic";
import { addJob, removeJob } from "../slices/jobQueueSlice";

const waitingIndicatorEpic: MyEpic = (action$, state$) => {
  const jobStarted$ = action$.pipe(ofType(addJob.type), share()); // needs Share?
  const jobEnded$ = action$.pipe(ofType(removeJob.type));

  const SHOW_WAITING_INDICATOR = { type: 'SHOW_WAITING_INDICATOR' };
  const HIDE_WAITING_INDICATOR = { type: 'HIDE_WAITING_INDICATOR' };

  const processJob$ = jobStarted$.pipe(
    mergeMap((action) => {
      // use uuid for job id
      return ajax
        .getJSON('https://httpbin.org/delay/5')
        .pipe(
          map((result) => ({ ...(result as object), id: action.payload.id }))
        );
    }),
    map((result) => removeJob(result.id))
  );

  const finishedJob$ = jobEnded$.pipe(
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const jobQueue = state.jobQueue.queue;

      return iif(
        () => Object.keys(jobQueue).length === 0,
        of(HIDE_WAITING_INDICATOR),
        EMPTY
      );
    })
  );

  const showWaitingIndicator$ = jobStarted$.pipe(mapTo(SHOW_WAITING_INDICATOR));

  return merge(showWaitingIndicator$, processJob$, finishedJob$).pipe(
    tap((action) => console.log(action))
  );
};

// dispatch start_job and add the job to store,
// show loading indicator
// process the job,
// job finished,
// dispatch end_job and remove the job from store,
// check if there is job on store, otherwise hide the job

export default waitingIndicatorEpic;
