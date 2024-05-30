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
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    });
    builder.addCase(decrementAction, (state, action) => {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    });
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
