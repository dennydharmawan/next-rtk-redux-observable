import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Job = {
  id: string;
  delay: number;
};

//https://stackoverflow.com/questions/53733322/typescript-describe-object-of-objects
type Queue = Partial<Record<Job['id'], Job>>;

const initialState = {
  queue: {} as Queue,
  isIdle: false,
};

const jobQueueSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      const jobInput = action.payload;

      state.queue[jobInput.id] = jobInput;

      return state;
    },
    removeJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;

      delete state.queue[jobId];

      return state;
    },
  },
});

export const { addJob, removeJob } = jobQueueSlice.actions;

export default jobQueueSlice.reducer;
