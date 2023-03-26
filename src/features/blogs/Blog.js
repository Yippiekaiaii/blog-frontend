
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
             
                <div className="blog_wrapper">
                    <h3>{blog.title}</h3>
                    <p>{blog.body}</p>
                    <p className="written_by">By: {blog.user} <span>{(role=='Admin' || role=='Moderator') && <img src="edit.svg" onClick={handleEdit}/>}</span></p>
                </div>

            )           

        } else return null

}

export default Blog