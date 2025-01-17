import { NextSeo } from "next-seo";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@material-ui/core";

import { decrement, increment } from "../lib/redux/slices/counterSlice";
import { addJob, removeJob } from "../lib/redux/slices/jobQueueSlice";
import { RootState } from "../lib/redux/store";

export default function about() {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  dispatch({ type: 'INITIALIZATION' });

  return (
    <div>
      <NextSeo
        title="About"
        canonical={`${process.env.CANONICAL_URL}/about`}
        openGraph={{
          url: `${process.env.CANONICAL_URL}/about`,
          title: 'About | My Site',
        }}
      />

      <div>{counter}</div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(increment(10))}
      >
        increment
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(decrement(10))}
      >
        decrement
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: 'PING' })}
      >
        PING
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: 'START_FETCHING' })}
      >
        Start Fetching
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: 'END_FETCHING' })}
      >
        End Fetching
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(addJob({ id: uuidv4(), delay: 4 }))}
      >
        Start Job
      </Button>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(removeJob('a'))}
      >
        Remove Job
      </Button> */}
    </div>
  );
}
