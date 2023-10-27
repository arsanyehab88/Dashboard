import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const adminApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://dashboard-cefo.onrender.com/" }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transaction", "Geography", "Sales", "Admins", "Performance", "DahsBoards"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `user/getUser/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => `/product`,
            providesTags: ["Products"]
        }),
        getCustomers: build.query({
            query: () => `user/customers`,
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "user/transaction",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transaction"]


        }),
        getGeography: build.query({
            query: () => `/user/geography`,
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => `/sales/overAllState`,
            providesTags: ["Sales"]
        }),
        getAdmins: build.query({
            query: () => `user/admins`,
            providesTags: ["Admins"]
        }),
        getPerformance: build.query({
            query: (id) => `user/performance/${id}`,
            providesTags: ["Performance"]
        }
        ),
        getDahsBoards: build.query({
            query: () => 'user/dashboard',
            providesTags: ["DahsBoards"]
        }),
        SignUp: build.mutation({
            query: (user) => ({
                url: 'user/signup',
                method: 'POST',
                body: user
            }),
        }),
        SignIn: build.mutation({
            query: (user) => ({
                url: 'user/signin',
                method: 'POST',
                body: user
            }),
        }),
        LogOut: build.mutation({
            query: (id) => ({
                url: `user/logout/${id}`,
                method: 'put',
            }),
        }),
        ChangePassword: build.mutation({
            query:(user)=>({
                url:`user/changePassword`,
                method: 'PATCH',
                body:user
            })
        })
    })
})


export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetPerformanceQuery,
    useGetDahsBoardsQuery,
    useSignUpMutation,
    useSignInMutation,
    useLogOutMutation,
    useChangePasswordMutation
} = adminApi