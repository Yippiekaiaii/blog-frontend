


const newBlog =() => {

    //Run on save button clicked
    const onSaveBlogClicked = async (e) => {
        e.preventDefault()
       
    }


    const content = (
        <>
            <p>New Blog</p>

            <form className="form" onSubmit={onSaveBlogClicked}>
               <button title="save">Save</button>
               <label className="form-label" htmlFor="title">Title:</label>
               <input id="title" name="title" type="text" autoComplete="off"/>
               <label className="form-label" htmlFor="body">Blog Body:</label>
               <input id="body" name="body" type="text" autoComplete="off"/>
               <label className="form-label" htmlFor="user">User:</label>
               <input id="user" name="user" type="user" autoComplete="off"/>
               <label className="form-label" htmlFor="link">Link:</label>
               <input id="link" name="link" type="link" autoComplete="off"/>

            </form>
        </>
    )

    return content
}

export default newBlog