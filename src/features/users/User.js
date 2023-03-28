
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useGetUsersQuery } from './usersApiSlice'


const User = ({userId}) => {     


    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate()
    
  
    if(user){       
        
        const handleEdit = () => navigate(`/users/${userId}`)               

        return (
             
                <tr>
                   
                    <td>{user.username}</td> 
                    <td>{user.role}</td>   
                    <td>{user.active ? "Active": "Inactive"}</td> 
                    <td className="table_edit"><img src="edit.svg" className="edit_icon" onClick={handleEdit} style={{width:"20px"}}/></td>    
                    
                </tr>
                
        )

    } else return null

}

export default User