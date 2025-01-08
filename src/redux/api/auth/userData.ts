import { baseApi } from "../baseApi";


const userDataApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getUserData: builder.query({
            query:(employeeId) =>({
                
                url:`accountRouter/current-month/${employeeId}`,
                method: "GET"
            }),
            // providesTags:['Bookings']
            
           
        }),
       
    })
})

export const {useGetUserDataQuery} = userDataApi