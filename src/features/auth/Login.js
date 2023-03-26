
import { useRef, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setcredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"


const Login =() => {

    const userRef = useRef() //set focus on user input
    const errRef = useRef() //set focus if there is an error

    //Set form state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [persist,setPersist] = usePersist()

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

    //Set state for trust device checkbox - takes the previous value of setPersist and set the variable to the opposite of what it was
    const handleToggle = () => setPersist(prev => !prev)

    const handleSubmit = async (e) => {
        e.preventDefault() //prevent the default submit behavour of refreshing the page
        try {
            const {accessToken} = await login({ username, password}).unwrap() //get the access token from the API via the state
            dispatch(setcredentials({accessToken}))
            setUsername('') //blank out the useName and password
            setPassword('')
            navigate('/')
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
        <h3>Sign In</h3>
        <p style={{fontSize:12}}>Please enter your credentials below</p>

        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form onSubmit={handleSubmit}>
          
                <div className="login_input">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required /><br></br>
            
                </div>
                
                <div className="login_input">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePwdInput} autoComplete="off" required />
                </div>

                <br></br>
                
                <img src="loginicon.png" alt="log in" onClick={handleSubmit}></img>
                <br></br>
                <label htmlFor="persist" style={{fontSize:10}}>Remember me</label>
                <input type = "checkbox" id="persist" onChange={handleToggle} checked={persist}/>
           
        </form>
        </>

    )

    return content
}

export default Login