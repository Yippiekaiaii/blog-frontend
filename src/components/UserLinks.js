import { NavLink } from "react-router-dom";


const UserLinks =() => {
    const content = (
        <header>
            <p>Logged In </p>          
            <NavLink to="/newblog">New Blog</NavLink>       
            <NavLink to="/userslist">Users</NavLink>           
        </header>
    )

    return content
}

export default UserLinks