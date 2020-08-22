import { ofType } from "redux-observable";
import { delay, mapTo, tap } from "rxjs/operators";

import { MyEpic } from "../rootEpic";

const pingPongEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    ofType('PING'),
    tap(() => {
      console.log(state$.value);
    }),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'PONG' })
  );

export default pingPongEpic;

//https://github.com/redux-observable/redux-observable/issues/706
