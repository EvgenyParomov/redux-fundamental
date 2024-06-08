import { AppThunk } from "../../../shared/redux";
import { usersSlice } from "../users.slice";

export const fetchUsers =
  ({ refetch }: { refetch?: boolean } = {}): AppThunk<Promise<void>> =>
  async (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
    if (!isIdle && !refetch) {
      return;
    }
    dispatch(usersSlice.actions.fetchUsersPending());
    return api
      .getUsers()
      .then((users) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersFailed());
      });
  };
