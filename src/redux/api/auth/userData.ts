import { baseApi } from "../baseApi";

const userDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (employeeId) => ({
        url: `accountRouter/current-month/${employeeId}`,
        method: "GET",
      }),
      providesTags:['dashboard']
    }),
    getAccountHead: builder.query({
      query: () => ({
        url: "/accountHead/get-account-heads",
        method: "GET",
      }),
      providesTags:['dashboard',"account"]
    }),
    addAccount: builder.mutation({
      query: (accountInfo) => ({
        url: "/accountRouter/add-account",
        method: "POST",
        body: accountInfo,
      }),
      invalidatesTags:['dashboard']
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useAddAccountMutation,
  useGetAccountHeadQuery,
} = userDataApi;
