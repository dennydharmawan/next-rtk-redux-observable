import { Button } from '@material-ui/core';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../lib/redux/slices/counterSlice';
import { RootState } from '../lib/redux/store';

export default function about() {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

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
        onClick={() => dispatch({ type: 'LOADING_START' })}
      >
        Show Loading
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: 'LOADING_END' })}
      >
        Show Loading
      </Button>
    </div>
  );
}
