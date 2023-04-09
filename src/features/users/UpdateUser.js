import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./UpdateUserForm";
import { useGetUsersQuery } from "./usersApiSlice";

const EditUser = () => {

    //Get the blog id from inside the url
    const {id} = useParams()    

    //Get the user from the state
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })
    

    if (!user) return <p className="loading">Loading....</p>

    //If we have a blog display the EditBlogForm component if not show loading
    const content = <EditUserForm user={user} /> 
 
    return content
}

export default EditUser