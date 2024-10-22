
import HomePage from './Common_Pages/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SearchPage from './Student_Pages/SearchPage.jsx';
import Login from './Common_Pages/Login.jsx';
import Signup from './Common_Pages/SignUp.jsx';
import ProfilePage from './Common_Pages/ProfilePage.jsx';
import UpdateProfile from './Common_Pages/UpdateProfilePage.jsx';
import AddHostel from './Owner_Pages/AddHostel.jsx';


const approuter = createBrowserRouter(
  [
     {
      path: "/",
      element: <HomePage/>
     }, 
     // protected route
     {
      path: "/search",
      element: <SearchPage/>
     }, 
     {
      path: "/login",
      element: <Login/>
     }, 
     {
      path: "/signup",
      element: <Signup/>
     },
     {
      path: "/profile",
      element : <ProfilePage/>
     },
     // protected route
     {
      path: "/profile/update",
      element : <UpdateProfile/>
     },{
      path : "/profile/addhostel",
      element : <AddHostel/>
     },
     {
      path : "/search",
      element : <SearchPage/>
     },
 
  ]
); 
function App() {
  
  return (
    <div>
       <RouterProvider router={approuter}/>
    </div>
  )
}

export default App; 
