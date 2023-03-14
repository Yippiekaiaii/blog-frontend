import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";  
import useAuth from "../hooks/useAuth";

//REGEX for userslist endpoint
const USERLIST_REGEX = /^\/userslist(\/)?$/
const EDITBLOG_REGEX = /^\/blogs(\/)?$/


const UserLinks =() => {
    
    const navigate = useNavigate()

    //Get username and role from useAuth hook
    const {username, role, isLoggedIn} = useAuth()

    //Get current pathname
    const {pathname} = useLocation()

    //Call sendLogout mutation from authApiSlice
    const [sendLogout,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    //If logout is successful navigate to home
    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    //Logout handler
    const onLogoutClicked = () => sendLogout()

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error:{error.message}</p>

    let userLinksClass = null    

    let content = null
    
    if (isLoggedIn) content = (
        <header className={userLinksClass}>
            <p>Logged In as {username} ({role})</p>          
            {(role=='Admin' || role=='Moderator' || role=='User') && <NavLink to="/newblog">New Blog</NavLink>}       
            {(role=='Admin' || role=='Moderator') && <NavLink to="/userslist">Users</NavLink>}   
            {(role=='Admin') && <NavLink to="/newuser">New User</NavLink>} 
            <button title="Logout" onClick={onLogoutClicked}>Log Out</button> 
        </header>
    )

    return content
}

export default UserLinks