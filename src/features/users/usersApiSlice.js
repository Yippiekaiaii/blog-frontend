import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

//Create new api slice
export const usersApiSlice = apiSlice.injectEndpoints({ 
    //Define end points
    endpoints: builder => ({

        //Get all users
        getUsers: builder.query({
                query: ()=>({
                    url: '/users',
                    validateStatus: (response,result) => {
                        return response.status === 200 && !result.isError
                    }, 
                }),

                //Modify the raw data from the API before is it put into the Redux store
                transformResponse: responseData => {
                    const loadedUsers = responseData.map(user => {
                        //Add user ID to the data so that we dont have to use _id from mongo
                        user.id = user._id
                        return user
                    });
                    return usersAdapter.setAll(initialState,loadedUsers)
                },
                
                providesTags: (result, error, arg) => {
                    //Check is ids exist in the result (ie successful return of users)
                    if (result?.ids) {
                        return [
                            //Create a tag object that represents the entire list and then combine it with all the user tags that came with the query
                            { type: 'User', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'User', id }))
                        ]
                    } else return [{ type: 'User', id: 'LIST' }]
                }
        }),

        //Add New User
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),

        //Update User
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),

        //Delete User
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),


    //End points end
    })  
})


//Create hooks
export const {useGetUsersQuery,useUpdateUserMutation,useAddNewUserMutation,useDeleteUserMutation} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)



//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds   
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)

