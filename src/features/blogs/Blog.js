import {useSelector} from 'react-redux'

import { selectBlogById } from './blogsApiSlice'




const Blog = ({ blogId}) => {
        const blog = useSelector(state=>selectBlogById(state,blogId))
       

        if (blog) {
                
            return (
                <tr className="table_row">                   
                    <td className="table__cell note__created">{blog.title}</td>
                    <td className="table__cell note__updated">{blog.body}</td>
                    <td className="table__cell note__title">{blog.link}</td>
                    <td className="table__cell note__username">{blog.user}</td>                   
                </tr>
            )           

        } else return null

}

export default Blog