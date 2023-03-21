import { store } from "../../app/store";
import { blogsApiSlice } from "../blogs/blogsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import React from 'react'

const Prefetch = () => {
    
    //Only run when component mounts
    useEffect(() => {
        console.log('subscribing')
        //create manual subscription to blogs and users that will remain active so that we have acess to the state and it will not expire
        const blogs = store.dispatch(blogsApiSlice.endpoints.getBlogs.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            //unsubscribe if we leave the protected pages
            blogs.unsubscribe()
            users.unsubscribe()           
        }
    }, [])

    return <Outlet />
}

export default Prefetch
