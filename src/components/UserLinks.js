import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";  

//REGEX for userslist endpoint
const USERLIST_REGEX = /^\/userslist(\/)?$/
const EDITBLOG_REGEX = /^\/blogs(\/)?$/

const UserLinks =() => {

    const navigate = useNavigate()

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


    const content = (
        <header className={userLinksClass}>
            <p>Logged In </p>          
            <NavLink to="/newblog">New Blog</NavLink>       
            <NavLink to="/userslist">Users</NavLink>   
            <NavLink to="/newuser">New User</NavLink> 
            <button title="Logout" onClick={onLogoutClicked}>Log Out</button>         
        </header>
    )

    return content
}

export default UserLinks