// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = baseApi;
