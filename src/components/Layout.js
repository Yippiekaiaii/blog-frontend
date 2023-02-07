import {Outlet} from 'react-router-dom'
import Header from './Header'

//This layout give us one parent component for all the other components so that if we wanted to add something to all we can

const Layout = () => {    
    return (
        <main>
            <Header/>  
            <Outlet/>    
        </main>
    )
}

export default Layout