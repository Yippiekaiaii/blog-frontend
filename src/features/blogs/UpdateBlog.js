import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBlogById } from "./blogsApiSlice";
import EditBlogForm from "./UpdateBlogForm";

const EditBlog = () => {

    //Get the blog id from inside the url
    const {id} = useParams()

    //Get the blog object with matching ID from the memoized state
    const blog = useSelector(state => selectBlogById(state,id))

    //If we have a blog display the EditBlogForm component if not show loading
    const content = blog ? <EditBlogForm blog={blog} /> : <p>Loading......</p>
 
    return content
}

export default EditBlog