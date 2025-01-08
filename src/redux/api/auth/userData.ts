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
      providesTags:["account"]
    }),
    getAccountUserData: builder.query({
      query: (employeeId) => ({
        url: `/accountRouter/get-account/${employeeId}`,
        method: "GET",
      }),
    //   providesTags:["account"]
    }),
    addAccount: builder.mutation({
      query: (accountInfo) => ({
        url: "/accountRouter/add-account",
        method: "POST",
        body: accountInfo,
      }),
      invalidatesTags:['dashboard']
    }),
    addHead: builder.mutation({
      query: (headInfo) => ({
        url: "/accountHead/add-accountHead",
        method: "POST",
        body: headInfo,
      }),
      invalidatesTags:['account']
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useAddAccountMutation,
  useGetAccountHeadQuery,
  useAddHeadMutation,
  useGetAccountUserDataQuery
} = userDataApi;
