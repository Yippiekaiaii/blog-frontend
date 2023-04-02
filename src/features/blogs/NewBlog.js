
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewBlogMutation } from "./blogsApiSlice"
import useAuth from "../../hooks/useAuth"

const NewBlog =() => {

    const {username} = useAuth()

    const [addNewblog, { //create addBlogNote function for use later
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewBlogMutation()
    
    const navigate = useNavigate()

    //set state for the form
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [link, setLink] = useState('')
    const [user, setUser] = useState(username)

    //Listen for the new blog submit being a success and then clear the state and navigate to /
    useEffect(()=>{
        if (isSuccess) {
            setTitle('')
            setBody('')
            setUser('')
            setLink('')
            navigate('/')
        }
    }, [isSuccess, navigate])

    //Handlers
    const onTitleChanged = e => setTitle(e.target.value)
    const onBodyChanged = e => setBody(e.target.value)   
    const onLinkChanged = e => setLink(e.target.value)

    //Check if form is in a suitable state to save
    const canSave = [title,body,user].every(Boolean) && !isLoading //if all items in the array are true & the form is not loading

    //Run on save button clicked
    const onSaveBlogClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewblog({title,body,link,user})
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    const content = (
        <>
            <div className="blog_input_title">
                <h3>New Blog</h3>     <img src="saveicon.png" alt="save" className="save_icon" onClick={onSaveBlogClicked} style={{width:"50px", height:"50px"}}></img>
             
            </div>

            <p className={errClass}>{error?.data?.message}</p>

           
                <div className="blog_wrapper">
                <form className="blog_form" onSubmit={onSaveBlogClicked}>

                <div className="blog_input">
                        <label className="form-label" htmlFor="title">Title:</label>
                        <input id="title" name="title" type="text" autoComplete="off" value={title} onChange={onTitleChanged}/>
                </div>

                <div className="blog_input">
                        <label className="form-label" htmlFor="body" style={{alignSelf:"flex-start"}}>Blog Body:</label>
                        <textarea                 
                                id="body"
                                name="body"
                                value={body}
                                onChange={onBodyChanged}
                            />
                        
                    </div>
                
                <div className="blog_input">
                        <label className="form-label" htmlFor="link">Link:</label>
                        <input id="link" name="link" type="link" autoComplete="off" value={link} onChange={onLinkChanged}/>
                </div>
                
               
                </form>
                </div>
           
        </>
    )

    return content
}

export default NewBlog