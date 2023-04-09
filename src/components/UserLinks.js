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

    //If logout is successful navigate to login page
    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess, navigate])

    //Logout handler
    const onLogoutClicked = () => sendLogout()

    if (isLoading) return <p className="loading">Logging Out...</p>

    if (isError) return <p>Error:{error.message}</p>

    let content = null
    
    if (isLoggedIn) content = (
        <header className="user_header">
        <div className="user_links_wrapper">

            <div className="user_links">   
                <NavLink to="/" className="link">Blogs</NavLink> 
                {(role=='Admin' || role=='Moderator' || role=='User') && <NavLink to="/newblog" className="link">New Blog</NavLink>}       
                {(role=='Admin' || role=='Moderator') && <NavLink to="/userslist" className="link">Users</NavLink>}   
                {(role=='Admin') && <NavLink to="/newuser" className="link">New User</NavLink>} 
              
            </div>

            <div className="user_name">
                <p>Logged In as {username} ({role})</p> 
                <img src="/logouticon.png" alt="log out" className="logout_icon" onClick={onLogoutClicked}></img>               
            </div>           
         
        </div>
        <hr/>
        </header>
    )

    return content
}

export default UserLinks