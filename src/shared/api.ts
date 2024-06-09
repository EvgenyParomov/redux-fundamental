import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Users"],
  endpoints: () => ({}),
});

/*

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`)
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.array().parse(res);
      });
  },

  getUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`)
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.parse(res);
      });
  },

  deleteUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
};

*/
