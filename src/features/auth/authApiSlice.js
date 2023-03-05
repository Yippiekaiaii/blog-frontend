import { apiSlice } from "../../app/apiSlice"
import { logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({

        endpoints: builder => ({

            //Login
            login: builder.mutation({
                query: credentials => ({
                    url: '/auth',
                    method: 'POST',
                    body: { ...credentials }
                })
            }),

            //Log out
            sendLogout: builder.mutation({
                query: ()=>({
                    url:'/auth/logout',
                    method:'POST',
                }),
                //onQueryStarted is provided by RTK query and allow us to verify our request was fulfilled successfully
                async onQueryStarted(arg, { dispatch, queryFulfilled}) {
                    try {
                        await queryFulfilled
                        dispatch(logOut()) //use logout from authslice to set token to null
                        dispatch(apiSlice.util.resetApiState()) //clears out the cache for the whole apiSlice
                    } catch (err) {
                        console.log(err)
                    }
                }
            }),

            //Refresh access token
            refresh: builder.mutation({
                query: ()=>({
                    url: '/auth/refresh',
                    method: 'GET',
                })
            }),

        })
})

export const {useLoginMutation, useSendLogoutMutation, useRefreshMutation} = authApiSlice