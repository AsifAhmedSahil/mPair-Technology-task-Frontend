// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mpair-task-backend.vercel.app/api",credentials: 'include' }),
  
  tagTypes:["dashboard","account"],
  endpoints: () => ({}),
});


