import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//Create an api slice 
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}), //provide URL for the API
    tagTypes: ['Blog','User'], //tags for cached data
    endpoints: builder => ({})  //empty builter as we will provide seperate slices that we will attach to this which is where we will provide the ectual details of the end points
})