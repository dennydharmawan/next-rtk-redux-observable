import { ofType } from "redux-observable";
import { delay, map } from "rxjs/operators";

import { MyEpic } from "../rootEpic";
import { decrement, increment } from "../slices/counterSlice";

const counterEpic: MyEpic = (action$) =>
  action$.pipe(
    ofType(increment.type),
    delay(500),
    map((action) => decrement(action.payload))
  );

export default counterEpic;
