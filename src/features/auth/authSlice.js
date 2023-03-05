
//Redux slice for storing authentication state

import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null},
    reducers: {
        //Set the state token to the accessToken passed in the payload from the API
        setcredentials: (state,action) => {
            const {accessToken} = action.payload
            state.token = accessToken
        },
        //Set the state token to null at logout time
        logOut: (state,action) => {
            state.token = null
        },
    }



})

export const {setcredentials,logOut} = authSlice.actions 
export default authSlice.reducer
export const selectCurrentToken = (state) => state.auth.token //create selector to get the current token from the state