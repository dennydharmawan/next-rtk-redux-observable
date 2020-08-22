import { ofType } from "redux-observable";
import { timer } from "rxjs";
import { mapTo, switchMap, takeUntil } from "rxjs/operators";

import { MyEpic } from "../rootEpic";

const displayLoadingEpic: MyEpic = (action$) =>
  action$.pipe(
    ofType('LOADING_START'),
    switchMap(() => {
      return timer(3000).pipe(
        mapTo({ type: 'LOADING_SHOW' }),
        // map(() => {
        //   return { type: 'LOADING_SHOW' };
        // }),
        takeUntil(action$.pipe(ofType('LOADING_END')))
      );
    })
  );

export default displayLoadingEpic;
