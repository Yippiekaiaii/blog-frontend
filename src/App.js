import './App.css';
import {createBrowserRouter,Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'

//Layouts
import Layout from './components/Layout'

//Pages
import PublicBlogs from './components/PublicBlogs'
import Error404 from './components/Error404'
import Login from './features/auth/Login'
import About from './components/About'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route> 
      <Route path="/" element={<Layout/>}>          
          <Route index element={<PublicBlogs/>} />    
          <Route path='/login' element={<Login/>} />   
          <Route path='/about' element={<About/>} />      
          <Route path ="*" element={<Error404/>} />
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
