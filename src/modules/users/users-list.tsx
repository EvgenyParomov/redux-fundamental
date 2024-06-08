import { memo, useEffect, useState } from "react";
import { useAppDispath, useAppSelector, useAppStore } from "../../store";
import { UserId, usersSlice } from "./users.slice";
import { fetchUsers } from "./model/fetch-users";
import { useNavigate } from "react-router-dom";

export function UsersList() {
  const dispatch = useAppDispath();
  const appStore = useAppStore();
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, appStore]);

  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row items-center">
          <button
            onClick={() => setSortType("asc")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Asc
          </button>
          <button
            onClick={() => setSortType("desc")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Desc
          </button>
        </div>
        <ul className="list-none">
          {sortedUsers.map((user) => (
            <UserListItem userId={user.id} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const UserListItem = memo(function UserListItem({
  userId,
}: {
  userId: UserId;
}) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.entities[userId]);
  const handleUserClick = () => {
    navigate(userId, { relative: "path" });
  };
  if (!user) {
    return null;
  }
  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
