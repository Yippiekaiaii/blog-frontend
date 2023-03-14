
import { Outlet, Link } from "react-router-dom"
import {useEffect, useRef, useState} from 'react'
import { useRefreshMutation } from "./authApiSlice"
import  usePersist  from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

import React from 'react'

const PersistLogin = () => {

    //Set state
    const [persist] = usePersist()
    //Bring in token from state
    const token = useSelector(selectCurrentToken)

    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess]=useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    //Use Effect Hook that Only run when the component mounts
    useEffect(() => {

        //When in React strict mode (for development) components mount twice, this makes sure the function only runs on second mount (unless not in develpment mode) 
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 

            //Attempt to refresh auth token, if success set setTrueSuccess state variable to true
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {                 
                    await refresh()  
                    //Set state to determine that the refresh has happened and we have the data (isSuccess can sometimes report back true and the data has not yet been recieved)
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            //Call the above function if there is no token (which is what happens when the browser is refreshed or relaoded) and persist value is true (ie user has set to remeber me)
            if (!token && persist) verifyRefreshToken()
        }

        //return and set effectRan to true (help prevent the component being run twice when in strict mode)
        return () => effectRan.current = true
    
    }, [])


    let content

    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <p>Loading...</p>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `} {/* template litteral used to add in a space */}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content

}

export default PersistLogin


