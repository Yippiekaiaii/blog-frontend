
import {useSelector} from 'react-redux'
import { selectBlogById } from './blogsApiSlice'




const Blog = ({ blogId}) => {
        const blog = useSelector(state=>selectBlogById(state,blogId))
       

        if (blog) {
                
            return (
                <tr className="table_row">                   
                    <td className="table_cell note_created">{blog.title}</td>
                    <td className="table_cell note_updated">{blog.body}</td>
                    <td className="table_cell note_title">{blog.link}</td>
                    <td className="table_cell note_username">{blog.user}</td>                   
                </tr>
            )           

        } else return null

}

export default Blog