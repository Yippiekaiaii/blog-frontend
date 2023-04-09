import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"

//REGEX for testing valid password
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

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
    const [cantSaveMessage,setMessage] = useState('')


    //If password changes test it against the REGEX (returns true if is valid)
    useEffect(()=>{
        setValidPassword(PWD_REGEX.test(password))
    },[password])

    //Check for success on update or delete, then clear state and go back to /userslist
    useEffect(() => {       
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
    const onCantSave = () => setMessage('Invalid Password, must be 4-12 chars and can include !@#$%')

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
        console.log('user.id in EditUserForm:', user.id);
        await deleteUser({ id: user.id })
    }

    //Check if form has all required fields filled out and the form is not in a loading state
    let canSave
    
    if (password) {
        canSave = [role, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [role, username].every(Boolean) && !isLoading
    }    

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    //Content Start
    const content = ( 
    <>
    <div className="box_wrapper">

            <div className="update_user_header">
                <h2>Edit User</h2>
                <div>
                    {canSave ?
                    <img src="/saveicon.png" alt="save" className="save_icon" onClick={onSaveUserClicked} style={{width:"50px", height:"50px"}}></img>
                    :
                    <img src="/saveicon.png" alt="save" className="save_icon" onClick={onCantSave} style={{width:"50px", height:"50px"}}></img>
                    }
                    <img src="/deleteicon.png" alt="delete" className="delete_icon" onClick={onDeleteUserClicked} style={{width:"50px", height:"50px"}}></img>                    
                </div>
            </div>

        <div className="update_user_wrapper"> 

            <div className="update_user_input">
                <label htmlFor="username">User Name:</label>
                <input id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged}/>
            </div>

            <div className="update_user_input">
                <label htmlFor="new-password">New Password:</label>
                <input id="new-password" name="new-password" type="password" autoComplete="off" onChange={onPasswordChanged}/>
            </div>

            <div className="update_user_input">
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" value={role} onChange={onRoleChanged}>
                                <option value="User">User</option>
                                <option value="Moderator">Moderator</option>
                                <option value="Admin">Admin</option>
                </select>    
            </div>  

            <div className="update_user_input">
                <label htmlFor="active">Active:</label>
                <input id="active" name="active" type="checkbox" checked={active} onChange={onActiveChanged}/>
            </div>
    
        </div>
        <p className="cantSave">{cantSaveMessage}</p>
        <p className={errClass}>{errContent}</p>
    </div>
    </>
)




return content

}

export default EditUserForm