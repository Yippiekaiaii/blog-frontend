
import { useState, useEffect } from "react"
import { useUpdateBlogMutation, useDeleteBlogMutation } from "./blogsApiSlice"
import { useNavigate } from "react-router-dom"


const EditBlogForm = ({blog}) => {
   
   
    //Create an array using the useUpdateBlogMutation from the blog api slice that contains the updateblog function and then some state properties
    const [updateBlog, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateBlogMutation()

    //Create deleteBlog function/array
    const [deleteBlog,{
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteBlogMutation()


        //Wrap updateBlog function in new function that adds some logging
        const updateBlogWithLogs = async (params) => {
            console.log("Updating blog with params: ", params);
            const result = await updateBlog(params);
            console.log("Update result: ", result);
            return result;
        };   

    //Bring in use navigate hook
    const navigate = useNavigate()

    //Innitiate state using useState hook 
    const [title, setTitle] = useState(blog.title)
    const [body, setBody] = useState(blog.body)
    const [link, setLink] = useState(blog.link)
    const [user, setUser] = useState(blog.user)
    const [hide, setHide] = useState(blog.hide)

    //Listen for the edit blog submit being a success and then clear the state and navigate to /
    useEffect(()=>{      
        if (isSuccess || isDelSuccess ) {       
            console.log("Success")    
            setTitle('')
            setBody('')
            setUser('')
            setLink('')
            setHide('') 
            navigate('/')
                       
        }
        
    }, [isSuccess,isDelSuccess, navigate]) //Array that contains the dependancies for the useEffect to trigger, in this case if isSuccess or navigate updates

    //Handlers pass in e (event) that has been triggered and retrieves the value of the element that triggered the event
    const onTitleChanged = e => setTitle(e.target.value)
    const onBodyChanged = e => setBody(e.target.value)
    const onUserChanged = e => setUser(e.target.value)
    const onLinkChanged = e => setLink(e.target.value)
    const onHideChanged = e => setHide(e.target.value)

    //Check if form has all required fields filled out and the form is not in a loading state
    const canSave = [title,body,user].every(Boolean) && !isLoading
    
    //On click save button
    const onSaveBlogClicked = async (e) => {
        if (canSave) {
            await updateBlogWithLogs({id: blog.id, title, body, link, user, hide}) 
                .then(()=>{navigate('/')})
                .catch(console.log("Error", error))   
        }
    }

    //On click delete button
    const onDeleteBlogClicked = async (e) => {
        await deleteBlog({id: blog.id})
                .then(()=>{navigate('/')})
                .catch(console.log("Error", error))   
    }

    const errClass = (isError) ? "errmsg" : "offscreen"
    const errContent = (error?.data?.message) ?? ''
    
    const content = (
        <>
        <h2>Update blog - {blog.title}</h2>
        <p className={errClass}>{errContent}</p>
        <form onSubmit={e => e.preventDefault()}>

           

            <label htmlFor="blog-title">Title</label>
            <input id="blog-title" name="title" type="text" autoComplete="off" value={title} onChange={onTitleChanged}/>
            
            <label htmlFor="blog-body">Body</label>
            <textarea id="blog-body" name="body" autoComplete="off" value={body} onChange={onBodyChanged}/>

            <label htmlFor="blog-user">User</label>
            <input id="blog-user" name="user" type="text" autoComplete="off" value={user} onChange={onUserChanged}/>

            <label htmlFor="blog-link">Link</label>
            <input id="blog-link" name="link" type="text" autoComplete="off" value={link} onChange={onLinkChanged}/>

            <label htmlFor="blog-active">Hide</label>
            <input id="blog-hide" name="hide" type="checkbox" autoComplete="off" value={hide} onChange={onHideChanged}/>

            <button title="save" onClick={onSaveBlogClicked} disabled={!canSave}>
                Save
            </button>

            <button title="delete" onClick={onDeleteBlogClicked}>
                Delete
            </button>
            
        </form> 
        </>
    )

    return content

}

export default EditBlogForm