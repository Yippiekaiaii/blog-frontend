
import {useSelector} from 'react-redux'
import { selectBlogById } from './blogsApiSlice'
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";


const Blog = ({ blogId}) => {

        const navigate = useNavigate()
        const blog = useSelector(state=>selectBlogById(state,blogId))
        const handleEdit = () => navigate(`/blogs/${blogId}`)
        const {username, role} = useAuth()

        if (blog) {
                
            return (
                <tr className="table_row">   
                    <td className="table_cell blog_id">{blog._id}</td>                
                    <td className="table_cell blog_created">{blog.title}</td>
                    <td className="table_cell blog_updated">{blog.body}</td>
                    <td className="table_cell blog_title">{blog.link}</td>
                    <td className="table_cell blog_username">{blog.user}</td>    
                    
                    <td className="table_cell">
                        {(role=='Admin' || role=='Moderator') && <button onClick={handleEdit}>Edit</button>}
                    </td>

                </tr>
            )           

        } else return null

}

export default Blog