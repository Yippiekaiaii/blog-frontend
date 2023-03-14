import './App.css';
import { createBrowserRouter,Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'

//Layouts
import Layout from './components/Layout'

//Pages
import PublicBlogs from './features/blogs/PublicBlogs'
import Error404 from './components/Error404'
import Login from './features/auth/Login'
import About from './components/About'
import NewBlog from './features/blogs/NewBlog'
import UsersList from './features/users/UsersList'
import EditBlog from './features/blogs/UpdateBlog' 
import EditUser from './features/users/UpdateUser'
import NewUser from './features/users/NewUser'
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import {ROLES} from './config/roles'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>    
          <Route path="/" element={<Layout/>}>      
              
              {/* Public Routes */}
              <Route index element={<PublicBlogs/>} />  
              <Route path='/login' element={<Login/>} />  
              <Route path='/about' element={<About/>} /> 

              {/* Protected Routes */}

              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>  

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Moderator]}/>}>  
                      <Route path='/userslist' element={<UsersList/>} />  
                      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>  
                        <Route path='/newuser' element={<NewUser/>}/>
                        <Route path='users'>
                            <Route path=':id' element={<EditUser/>} />
                        </Route>
                      </Route>                      
                    </Route>

                    <Route path='/newblog' element={<NewBlog/>} />  		  
                    
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Moderator]}/>}>  
                      <Route path="blogs">
                        <Route path=":id" element={<EditBlog/>} />
                      </Route>
                    </Route>

                    <Route path="*" element={<Error404/>} />
                </Route> 
              </Route>
              {/* End Protected Routes */}

          </Route>
         
        
    </Route>
  )
)


function App() {
  return (   
   
      <RouterProvider router={router} /> 
    
  )

}

export default App;
