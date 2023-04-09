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
    const [role,setRole] = useState('User')

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
        <div className="box_wrapper">
            <p className={errClass}>{error?.data?.message}</p>

            <div className="new_user_header">
                <h3>New User</h3>
                <img src="/saveicon.png" alt="save" className="save_icon" onClick={onSaveUserClicked} style={{width:"50px", height:"50px"}} disabled={!canSave}></img>                
            </div>

            <form className="form" onSubmit={onSaveUserClicked}>       
             
             <div className="new_user_wrapper">            
                       
                <div className="new_user_input">
                    <label htmlFor="username">Username: <span className="nowrap">[3-20 letters]</span></label>
                    <input id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged}/>
                </div>

                <div className="new_user_input">
                    <label htmlFor="password">Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input id="password" name="password" type="password" value={password} onChange={onPasswordChanged}/>
                </div>               

                <div className="new_user_input">
                    <label htmlFor="roles">Role:</label>
                    
                    <select id="role" name="role" value={role} onChange={onRoleChanged}>
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

            </div>

            </form>
        </div>
        </>
    )
   
    return content

}

export default NewUser