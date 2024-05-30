import {
  combineReducers,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  description: string;
};

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

type CounterState = {
  counter: number;
};
export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

export type UserSelectedAction = {
  type: "userSelected";
  payload: {
    userId: UserId;
  };
};

export type UserRemoveSelectedAction = {
  type: "userRemoveSelected";
};

export type UsersStoredAction = {
  type: "usersStored";
  payload: {
    users: User[];
  };
};

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

type Action =
  | IncrementAction
  | DecrementAction
  | UserSelectedAction
  | UserRemoveSelectedAction
  | UsersStoredAction;

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};
const initialCounterState: CounterState = { counter: 0 };
const intiialCountersState: CountersState = {};

const usersReducer = (
  state = initialUsersState,
  action: Action
): UsersState => {
  switch (action.type) {
    case "usersStored": {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserId, User>),
        ids: users.map((user) => user.id),
      };
    }

    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }
    case "userRemoveSelected": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    default:
      return state;
  }
};
const countersReducer = (
  state = intiialCountersState,
  action: Action
): CountersState => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  users: usersReducer,
  counters: countersReducer,
});

export const store = configureStore({
  reducer: reducer,
});

store.dispatch({
  type: "usersStored",
  payload: { users },
} satisfies UsersStoredAction);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
