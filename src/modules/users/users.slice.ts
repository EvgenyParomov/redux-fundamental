import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./model/fetch-users";
import { createSlice, ExtraArgument } from "../../shared/redux";

export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  description: string;
};

type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  fetchUsersStatus: "idle" | "pending" | "success" | "failed";
  fetchUserStatus: "idle" | "pending" | "success" | "failed";
  deleteUserStatus: "idle" | "pending" | "success" | "failed";
};

export const initialUsersList: User[] = Array.from(
  { length: 3000 },
  (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
  })
);

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: "idle",
  fetchUserStatus: "idle",
  deleteUserStatus: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  selectors: {
    selectUserById: (state, userId: UserId) => state.entities[userId],
    selectSortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: "asc" | "desc") => sort,
      (ids, entities, sort) =>
        ids
          .map((id) => entities[id])
          .filter((user): user is User => !!user)
          .sort((a, b) => {
            if (sort === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
    selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === "pending",
  },
  reducers: (creator) => ({
    fetchUser: creator.asyncThunk<
      User,
      { userId: UserId },
      { extra: ExtraArgument }
    >(
      (params, thunkAPI) => {
        return thunkAPI.extra.api.getUser(params.userId);
      },
      {
        options: {},
        pending: (state) => {
          state.fetchUserStatus = "pending";
        },
        fulfilled: (state, action) => {
          const user = action.payload;
          state.fetchUserStatus = "success";
          state.entities[user.id] = user;
        },
        rejected: (state) => {
          state.fetchUserStatus = "failed";
        },
      }
    ),

    deleteUserPending: creator.reducer((state) => {
      state.deleteUserStatus = "pending";
    }),
    deleteUserSuccess: creator.reducer(
      (state, action: PayloadAction<{ userId: UserId }>) => {
        state.deleteUserStatus = "success";

        delete state.entities[action.payload.userId];
        state.ids = state.ids.filter((id) => id !== action.payload.userId);
      }
    ),
    deleteUserFailed: creator.reducer((state) => {
      state.deleteUserStatus = "failed";
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchUsersStatus = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = "success";
      const users = action.payload;

      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchUsersStatus = "failed";
    });
  },
});
