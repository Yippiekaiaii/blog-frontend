import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {apiSlice, fetchBaseQuery} from './apiSlice'

export const store = configureStore({
        reducer:{
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true
})