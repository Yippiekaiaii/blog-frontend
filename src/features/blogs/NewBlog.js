
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewBlogMutation } from "./blogsApiSlice"

const NewBlog =() => {

    const [addNewblog, { //create addBlogNote function for use later
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewBlogMutation()
    
    const navigate = useNavigate()

    //set use state for the form
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [link, setLink] = useState('')
    const [user, setUser] = useState('')

    //Listen for the new user submit being a success and then clear the state and navigate to blogs route
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
    const onUserChanged = e => setUser(e.target.value)
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
            <p>New Blog</p>
            
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveBlogClicked}>

               <button title="save">Save</button>

               <label className="form-label" htmlFor="title">Title:</label>
               <input id="title" name="title" type="text" autoComplete="off" value={title} onChange={onTitleChanged}/>

               <label className="form-label" htmlFor="body">Blog Body:</label>
               <textarea                 
                    id="body"
                    name="body"
                    value={body}
                    onChange={onBodyChanged}
                />


               <label className="form-label" htmlFor="user">User:</label>
               <input id="user" name="user" type="user" autoComplete="off" value={user} onChange={onUserChanged}/>

               <label className="form-label" htmlFor="link">Link:</label>
               <input id="link" name="link" type="link" autoComplete="off" value={link} onChange={onLinkChanged}/>

            </form>
        </>
    )

    return content
}

export default NewBlog