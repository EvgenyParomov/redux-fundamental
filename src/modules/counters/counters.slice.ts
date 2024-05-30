import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../store";

type CounterState = {
  counter: number;
};
export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

export const incrementAction = createAction<{
  counterId: CounterId;
}>("countres/increment");

export const decrementAction = createAction<{
  counterId: CounterId;
}>("countres/decrement");

const initialCounterState: CounterState = { counter: 0 };
const initialCountresState: CountersState = {};

export const countersReducer = createReducer(
  initialCountresState,
  (builder) => {
    builder.addCase(incrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = initialCounterState;
      }
      state[counterId].counter++;
    });
    builder.addCase(decrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = initialCounterState;
      }
      state[counterId].counter++;
    });
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
