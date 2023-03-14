import {useLocation, Navigate, Outlet} from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import React from 'react'

const RequireAuth = ({allowedRoles}) => {

  //Get current url path
  const location = useLocation()

  //Get current users role
  const {role} = useAuth()

  const content = (
    //check if role is on allowedRoles list that is passed as a property
    allowedRoles.includes(role)
        ? <Outlet /> //if is true and on list then show content
        : <Navigate to="/login" state={{from: location}} replace /> //else send to loggin page, replace removes the RequireAuth component from the history so back button isnt effected
  )

  return content

}

export default RequireAuth

