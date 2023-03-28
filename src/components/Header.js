import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Header =() => {

    const {username,role,isLoggedIn} = useAuth()

    const content = (
        <>
        <div className="header_background">
            <div className="header_wrapper">
                <header className="main_header">
                    <h1>Welcome To My Blog Page</h1>

                    <div className="main_links">
                        <NavLink to="/">Home</NavLink>
                        {(!isLoggedIn) && <NavLink to="/login">Login</NavLink>}
                        <NavLink to="/about">About</NavLink>   
                    </div>
                    
                </header>
            
                <p>Node, React, Javascript and more</p>
            </div>
        </div>
        </>
    )

    return content
}

export default Header