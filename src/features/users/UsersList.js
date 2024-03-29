import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"

const UsersList = () => {

    useTitle('Blog: Users')

    const {username,role} = useAuth()
    const {
        data: users, //rename the data we recieve from the hook to users
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('userslist', {
        //Options brought in store.js setuplisteners
        pollingInterval: 60000,  //Refetch data interval in ms
        refetchOnFocus: true,   //Refetch if we put focus on another window and then back to the browser
        refetchOnMountOrArgChange: true //If the component is remounted we refetch the data
    })

    let content

    if (isLoading) content = <p className="loading">Loading....</p>

    if (isError){
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const {ids, entities} = users //destructure ids & entities from the users data
        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)  //check there are some id's existing then map over ids
       
        content = (
            <>
            <div className="box_wrapper">
                <h3>Users List</h3>
                <table>
                    <thead>
                        <tr>                
                            <th scope="col">Username</th>   
                            <th scope="col">Role</th>  
                            <th scope="col">Active</th>                     
                            <th scope="col">Edit</th>                  
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
            </>
        )
    }

    return content

}

export default UsersList