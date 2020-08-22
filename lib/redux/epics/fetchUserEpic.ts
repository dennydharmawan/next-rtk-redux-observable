import { ofType } from "redux-observable";
import { from } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, mergeMap, switchMap, toArray } from "rxjs/operators";

import { MyEpic } from "../rootEpic";

const fetchUserEpic: MyEpic = (action$) =>
  action$.pipe(
    ofType('FETCH_USER_STARTED'),
    switchMap((action) => {
      return from(action.payload).pipe(
        mergeMap((id) =>
          ajax.getJSON('https://jsonplaceholder.typicode.com/posts/' + id)
        ),
        toArray(),
        map((result) => ({ type: 'FETCH_USER_SUCCESSFUL', payload: result }))
      );
    })
  );

export default fetchUserEpic;
