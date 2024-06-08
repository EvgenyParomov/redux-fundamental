import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { UsersList } from "./modules/users/users-list";
import { Counters } from "./modules/counters/counters";
import { UserInfo } from "./modules/users/user-info";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="container p-5 flex flex-col gap-5">
        <header className="py-5 flex gap-4">
          <Link to="users">Users</Link>
          <Link to="counters">Counters</Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => redirect("/users"),
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "users/:id",
        element: <UserInfo />,
      },
      {
        path: "counters",
        element: <Counters />,
      },
    ],
  },
]);
