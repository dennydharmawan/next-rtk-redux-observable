import { ofType } from "redux-observable";
import { EMPTY, of } from "rxjs";
import { defaultIfEmpty, ignoreElements, mapTo, tap } from "rxjs/operators";

import { MyEpic } from "../rootEpic";

const appVersion = '1.0.0';

const logAppVersionEpic: MyEpic = (action$) => {
  return action$.pipe(
    ofType('INITIALIZATION'),
    mapTo(appVersion),
    tap(console.info),
    ignoreElements()
  );
};

export default logAppVersionEpic;
