import { NavLink, Outlet } from "react-router-dom";


const Header =() => {
    const content = (
        <header>
            <h1>Welcome To My Developers Blog Page</h1>
            <p>Where I document my journey into web development</p>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>  
            <NavLink to="/about">About</NavLink>     
        </header>
    )

    return content
}

export default Header