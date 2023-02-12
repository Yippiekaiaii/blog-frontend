import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";


const blogsAdapter = createEntityAdapter({})

const initialState = blogsAdapter.getInitialState()

export const blogsApiSlice = apiSlice.injectEndpoints({
        endpoints: builder => ({

            //Get All Blogs   
            getBlogs: builder.query({
                query: () => ({
                    url:'/blogs', //set end point of the API
                    ValidateStatus: (response, result) => {
                        return response.status === 200 && !result.isError // validate the status make sure there is not an error
                    },        
                }),

                transformResponse: responseData => {
                    //As we are using mongoDB we need to apply the below to the id to convert _id to id
                    const loadedBlogs = responseData.map(blog =>{
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
            })



        })
})

export const { useGetBlogsQuery,useAddNewBlogMutation } = blogsApiSlice //export hook which is auto generated by rtk query

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