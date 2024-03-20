import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'
import { setToken } from '@/store/apps/auth/token';

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base.base,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = localStorage.getItem('token') as string

            if (token !== '') {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getCity: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getDistrict: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getTown: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getUserAddress: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        setUserAddress: builder.mutation({
            query: (body) => ({
                url: '/address/user-add-address',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string, user: any }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (error) {
                }
            }
        }),
        updateUserAddress: builder.mutation({
            query: (body) => ({
                url: `/address/user-address/${body.id}`,
                method: 'PUT',
                body,
            }),
            transformResponse: (result: { token: string, user: any }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (error) {
                }
            }
        }),
    }),
})

export const { useGetCityQuery, useGetDistrictQuery, useGetTownQuery, useGetUserAddressQuery, useSetUserAddressMutation, useUpdateUserAddressMutation } = addressApi