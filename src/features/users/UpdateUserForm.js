import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"


const EditUserForm = ({user}) => {

    //Create an array using the useUpdateUserMutation from the user api slice that contains the updateuser function and then some state properties
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    //Bring in use navigate hook
    const navigate = useNavigate()

    //Innitiate state using useState hook 
    const [username, setUsername] = useState(user.username)  
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [role, setRole] = useState(user.role)
    const [active, setActive] = useState(user.active)

    //Check for success on update or delete, then clear state and go back to /userslist
    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRole('')
            navigate('/userslist')
        }
    }, [isSuccess, isDelSuccess, navigate])

    //Handlers
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onRoleChanged = e => setRole(e.target.value)
    const onActiveChanged = () => setActive(prev => !prev)

    //Update Record
    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, role, active })
        } else {
            await updateUser({ id: user.id, username, role, active })
        }
    }

    //Delete Record
    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    //Check if form has all required fields filled out and the form is not in a loading state
    const canSave = [username,role].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    //Content Start
    const content = ( 
    <>
        <p className={errClass}>{errContent}</p>
        <h2>Edit User</h2>

        <button title="Save" onClick={onSaveUserClicked} disabled={!canSave}>Save</button>
        <button title="Delete" onClick={onDeleteUserClicked} disabled={!canSave}>Delete</button>

        <label htmlFor="username">User Name</label>
        <input id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged}/>

        <label htmlFor="role">Role</label>
        <input id="role" name="role" type="text" autoComplete="off" value={role} onChange={onRoleChanged}/>

        <label htmlFor="active">Active</label>
        <input id="active" name="active" type="text" autoComplete="off" value={active} onChange={onActiveChanged}/>

        <label htmlFor="new-password">New Password</label>
        <input id="new-password" name="new-password" type="text" autoComplete="off"/>
        <p>password change is not currently functional - add in encrypt and save</p>

    </>
)




return content

}

export default EditUserForm