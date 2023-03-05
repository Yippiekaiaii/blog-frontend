import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewUserMutation } from "./usersApiSlice"

const NewUser = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    //set state for form
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [role,setRole] = useState('')

    //Check for successful add user request
    useEffect(()=>{
        if (isSuccess){
            setUserName('')
            setPassword('')
            setRole('')
            navigate('/userslist')
        }
    })


    //Check if possible to save
    const canSave = [role.length,username.length].every(Boolean) && !isLoading

    //Handlers   
   
    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({username,password,role})
        }

    }

    //Update form state
    const onUsernameChanged = e => setUserName(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onRoleChanged = e => setRole(e.target.value)

    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
        
                <h2>New User</h2>
            
                <button title="Save" disabled={!canSave}>Save</button>            
            
                <label htmlFor="username">Username: <span className="nowrap">[3-20 letters]</span></label>
                <input id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged}/>

                <label htmlFor="password">Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input id="password" name="password" type="password" value={password} onChange={onPasswordChanged}/>

                <label htmlFor="roles">Role:</label>
                <input id="role" name="role" type="role" value={role} onChange={onRoleChanged}/>

            </form>
        
        </>
    )
   
    return content


}

export default NewUser