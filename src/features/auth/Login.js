
import { useRef, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setcredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"


const Login =() => {

    const userRef = useRef() //set focus on user input
    const errRef = useRef() //set focus if there is an error

    //Set form state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Bring in login mutation and loading state from authApiSice
    const [login, {isLoading}] = useLoginMutation()

    //As empty depenancy this only run on load - sets the focus to the field
    useEffect(()=>{
        userRef.current.focus()
    },[])

    //Clear out error message state when username or password changes
    useEffect(()=>{
        setErrMsg('')
    },[username,password])

    //Handlers
    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault() //prevent the default submit behavour of refreshing the page
        try {
            const {accessToken} = await login({ username, password}).unwrap() //get the access token from the API via the state
            dispatch(setcredentials({accessToken}))
            setUsername('') //blank out the useName and password
            setPassword('')
            navigate('/userslist')
        } catch (err) {
            if (!err.status){
                setErrMsg('No Server Response')
            } else if (err.status===400){
                setErrMsg('Missing Username or Password')
            } else if (err.status===401){
                setErrMsg('Unauthorised')
            } else {
                setErrMsg(err.data?.message)
            }
            errRef.current.focus();
        }
    }


    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading....</p>

    const content = (
        <>
        <p>Login</p>

        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form onSubmit={handleSubmit}>

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required />
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" value={password} onChange={handlePwdInput} autoComplete="off" required />

            <button>Log In</button>

        </form>
        </>

    )

    return content
}

export default Login