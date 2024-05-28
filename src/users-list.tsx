import { useState } from "react";

type UserId = string;
type User = {
  id: UserId;
  name: string;
  description: string;
};

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

export function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User>();

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackButtonClick = () => {
    setSelectedUser(undefined);
  };

  const sortedUsers = users.sort((a, b) => {
    if (sortType === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="flex flex-col items-center">
      {!selectedUser ? (
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
              <UserListItem
                onClick={() => handleUserClick(user)}
                user={user}
                key={user.id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser
          user={selectedUser}
          onBackButtonClick={handleBackButtonClick}
        />
      )}
    </div>
  );
}

function UserListItem({ user, onClick }: { user: User; onClick: () => void }) {
  return (
    <li key={user.id} className="py-2" onClick={onClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
}

function SelectedUser({
  user,
  onBackButtonClick,
}: {
  user: User;
  onBackButtonClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
    </div>
  );
}
