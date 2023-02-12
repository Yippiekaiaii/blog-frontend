
import { useGetBlogsQuery } from "./blogsApiSlice";
import Blog from './Blog'

const PublicBlogs =() => {
 
    //Use the useGetBlogsQuery hook from the blogsApiSlice.js
    const {
        data: blogs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBlogsQuery()

    let content

    //Loading 
    if (isLoading) content = <p>Loading...</p>

    //On Error
    if (isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    }
     
    if (isSuccess) {
       
       const {ids,entities} = blogs    

       let filteredIds = [...ids] //For later to allow addition of a filter to the blog list
       
       const tableContent = ids?.length && filteredIds.map(blogId => <Blog key={blogId} blogId={blogId}/>)

       content = (
        <table className="table">
            <thead className="table_thead">
                <tr>
                    <th scope="col" className="table__th blog_title">Title</th>
                    <th scope="col" className="table__th blog_body">Body</th> 
                    <th scope="col" className="table__th blog_by">By</th> 
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
        )
    }    
    
    return content   


}

export default PublicBlogs