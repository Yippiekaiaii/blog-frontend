
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
        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td>{user.username}</td> 
                <td>{user.role}</td>   
                <td>{user.active}</td> 
                <button onClick={handleEdit}>Edit</button>                
            </tr>
        )

    } else return null

}

export default User