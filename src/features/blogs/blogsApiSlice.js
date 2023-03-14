import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";

//create new adaptor object for managing entities
const blogsAdapter = createEntityAdapter({})

//Initialise the initial state of the Redux Store
const initialState = blogsAdapter.getInitialState()

//Create end points for blog CRUD operations
export const blogsApiSlice = apiSlice.injectEndpoints({
    //Define end points
        endpoints: builder => ({

            //Get All Blogs   
            getBlogs: builder.query({
                query: () => ({
                    url:'/blogs', //set end point of the API
                    ValidateStatus: (response, result) => {
                        return response.status === 200 && !result.isError // validate the status make sure there is not an error
                    },        
                }),

                //Modify the raw data from the API before is it put into the Redux store
                transformResponse: responseData => {                  
                    const loadedBlogs = responseData.map(blog =>{
                        //Add blog ID to the data so that we dont have to use _id from mongo
                        blog.id = blog._id
                        return blog
                    })
                    return blogsAdapter.setAll(initialState,loadedBlogs) //return the data and put it into the blogsAdapter, now sotred as normalised data with id's and entities
                },

                providesTags: (result, error, arg) => {
                    if (result?.ids) {
                        return [
                            { type: 'Blog', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'Blog', id }))
                        ]
                    } else return [{ type: 'Blog', id: 'LIST' }]  
                }
               
            }),

           //Add new Blog
           addNewBlog: builder.mutation({
                query: initialBlog => ({ //pass in data from the form
                    url: '/blogs',
                    method: 'POST',
                    body:{
                        ...initialBlog, //body of the request to the API will be in the data passed above
                    }
                }),                
                invalidatesTags: [
                    { type: 'Blog', id: "LIST" }
                ]
            }),

            //Update blog
            updateBlog: builder.mutation({              
                query: initialBlog => ({
                    url: '/blogs',
                    method: 'PATCH',
                    body: {
                        ...initialBlog,
                    }                 
                }),
                onSuccess: (result, variables, context) => {
                    console.log('Update blog succeeded!', result.data);
                  },   
                //invalidateTags notifies the query cache management system that the cache for the effected data is no longer valid and should be refetched for future use             
                invalidatesTags: (result, error, arg) => [
                    {type: 'Blog', id: arg.id}
                ]
            }),

            //Delete Blog
            deleteBlog: builder.mutation({
                query: ({id}) => ({
                    url: '/blogs',
                    method: 'DELETE',
                    body:{id}
                }),
                invalidatesTags: (result, error, arg) => [
                    {type: 'Blog', id: arg.id}
                ]
            })

        })
})

export const { useGetBlogsQuery,useAddNewBlogMutation,useUpdateBlogMutation,useDeleteBlogMutation } = blogsApiSlice //export hook which is auto generated by rtk query

// returns the query result object
export const selectBlogsResult = blogsApiSlice.endpoints.getBlogs.select()

// creates memoized selector so that we can access notes without getting them from the db each time
const selectBlogsData = createSelector(
    selectBlogsResult,
    blogsResult => blogsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogById,
    selectIds: selectBlogIds
    // Pass in a selector that returns the blogs slice of state
} = blogsAdapter.getSelectors(state => selectBlogsData(state) ?? initialState)