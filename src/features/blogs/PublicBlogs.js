
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
    } = useGetBlogsQuery(undefined, {
        //Options brought in store.js setuplisteners
        pollingInterval: 60000,  //Refetch data interval in ms
        refetchOnFocus: true,   //Refetch if we put focus on another window and then back to the browser
        refetchOnMountOrArgChange: true //If the component is remounted we refetch the data
    })

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
       content = <div>{tableContent}</div>
      
    }    
    
    return content   


}

export default PublicBlogs