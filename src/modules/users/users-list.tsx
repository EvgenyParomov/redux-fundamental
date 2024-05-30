import { memo, useState } from "react";
import { useAppDispath, useAppSelector } from "../../store";
import { UserId, usersSlice } from "./users.slice";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  const selectedUserId = useAppSelector(
    usersSlice.selectors.selectSelectedUserId
  );

  return (
    <div className="flex flex-col items-center">
      {!selectedUserId ? (
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
      ) : (
        <SelectedUser userId={selectedUserId} />
      )}
    </div>
  );
}

const UserListItem = memo(function UserListItem({
  userId,
}: {
  userId: UserId;
}) {
  const user = useAppSelector((state) => state.users.entities[userId]);
  const dispatch = useAppDispath();
  const handleUserClick = () => {
    dispatch(usersSlice.actions.selected({ userId }));
  };
  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});

function SelectedUser({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => state.users.entities[userId]);
  const dispatch = useAppDispath();
  const handleBackButtonClick = () => {
    dispatch(usersSlice.actions.selectRemove());
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
