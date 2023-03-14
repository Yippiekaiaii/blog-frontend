import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setcredentials } from '../features/auth/authSlice'


//add header to the api slice end points, include an access token if it is found the the current redux state
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers,{getState}) => {
        const token = getState().auth.token
        //If access token found in redux state add auth header
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }

})

//Intercept responses with a 403 Forbidden status code and obtain a new access token by sending the refresh token
const baseQueryWithReauth = async (args,api,extraOptions) => {

    //run the above baseQuery
    let result = await baseQuery(args,api,extraOptions)    

    if (result?.error?.status === 403){
        console.log('Sending Refresh Token')

        //Send refresh token to get new access token using the API /refresh endpoint
        const refreshResult = await baseQuery('/auth/refresh',api,extraOptions)

        if (refreshResult?.data) {

            //Store the new token in the redux state using the setCredentials action creator from authSlice
            api.dispatch(setcredentials({...refreshResult.data}))

            //retry original query with new access token
            result = await baseQuery(args,api,extraOptions)

        } else {
            if (refreshResult?.error?.status === 403){
                refreshResult.error.data.message = "Your login has expired"
            }
            return refreshResult
        }
    } 

    return result
}


//Create an api slice 
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, //use the above baseQueryWithReauth as the base query so tokens can be auto refreshed
    tagTypes: ['Blog','User'], //tags for cached data returned by the api, any cached data will be tagged with either Blog or User
    endpoints: builder => ({})  //empty builder as we will provide seperate slices that we will attach to this which is where we will provide the actual details of the end points
})