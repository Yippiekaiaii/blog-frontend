import {Outlet} from 'react-router-dom'
import Header from './Header'
import UserLinks from './UserLinks'
import React, {useState} from 'react'

//This layout give us one parent component for all the other components so that if we wanted to add something to all we can

const Layout = () => {    

    const [isChecked, setIsChecked] = useState(false)
    return (
        <main>
            <Header/> 
            <UserLinks setIsChecked={setIsChecked}/>
            <div className='content_wrapper'>                 
                <Outlet isChecked={isChecked}/> 
            </div> 
               
        </main>
    )
}

export default Layout