import { AppThunk } from "../../../shared/redux";
import { UserId, usersSlice } from "../users.slice";
import { fetchUsers } from "./fetch-users";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());
    try {
      await api.deleteUser(userId);
      await router.navigate("/users");
      await dispatch(fetchUsers({ refetch: true }));
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }));
    } catch (e) {
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
