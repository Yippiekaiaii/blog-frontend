import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Header =() => {

    const {username,role,isLoggedIn} = useAuth()

    const content = (
        <header>
            <h1>Welcome To My Developers Blog Page</h1>
            <p>Where I document my journey into web development</p>
            <NavLink to="/">Home</NavLink>
            {(!isLoggedIn) && <NavLink to="/login">Login</NavLink>}
            <NavLink to="/about">About</NavLink>     
        </header>
    )

    return content
}

export default Header