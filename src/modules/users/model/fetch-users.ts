import { api } from "../../../shared/api";
import { AppDispatch, AppState } from "../../../store";
import { usersSlice } from "../users.slice";

export const fetchUsers = (dispatch: AppDispatch, getState: () => AppState) => {
  const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
  if (!isIdle) {
    return;
  }
  dispatch(usersSlice.actions.fetchUsersPending());
  api
    .getUsers()
    .then((users) => {
      dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
    })
    .catch(() => {
      dispatch(usersSlice.actions.fetchUsersFailed());
    });
};
