import { apiSlice } from "../../app/apiSlice"
import { logOut, setcredentials } from "./authSlice"


//Create end points for auth
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
                        const { data } = await queryFulfilled
                        console.log(data)
                        dispatch(logOut()) //use logout from authslice to set token to null
                        setTimeout(()=>{ //this give a 1 sec delay to allow the unmounting of the component
                            dispatch(apiSlice.util.resetApiState()) //clears out the cache for the whole apiSlice
                        }, 1000)                     

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
                }),

                //When query is run take the reply from the API, destructure it and put it into state
                async onQueryStarted(arg, { dispatch, queryFulfilled}) {
                    try {
                        //when the data is returned from the API (it will be a refresh token) destructure 
                        const {data} = await queryFulfilled                        
                        console.log(data)  
                        //destructure the access token from the data                      
                        const {accessToken} = data
                        //Pass the accessToken in to state
                        dispatch(setcredentials({accessToken}))
                    } catch (err) {
                        console.log(err)
                    }
                }

            }),

        })
})

export const {useLoginMutation, useSendLogoutMutation, useRefreshMutation} = authApiSlice