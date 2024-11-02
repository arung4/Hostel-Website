
import HomePage from './Common_Pages/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SearchPage from './Student_Pages/SearchPage.jsx';
import Login from './Common_Pages/Login.jsx';
import Signup from './Common_Pages/SignUp.jsx';
import ProfilePage from './Common_Pages/ProfilePage.jsx';
import UpdateProfile from './Common_Pages/UpdateProfilePage.jsx';
import AddHostel from './Owner_Pages/AddHostel.jsx';
import HostelDetails from './Student_Pages/HostelDetails.jsx';
import ProtectedRoute from './Owner_Pages/ProtectedRoute.jsx';
import UpdateHostel from "./Owner_Pages/UpdateHostel.jsx";
import Hostel from './components/HoselDetails_Components/Hostel.jsx';


const approuter = createBrowserRouter(
  [
     {
      path: "/",
      element: <HomePage/>
     }, 
     {
      path:"/hostel",
      element:<Hostel/>
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
     {
      path: "/profile/update",
      element: <UpdateProfile/>
     },
     {
      path : "/search",
      element : <SearchPage/>
     },
     {
      path: "/hostel",
      element: <HostelDetails/>
     },
     // protected route for onwer
     {
      path: "/owner/profile",
      element: <ProtectedRoute><ProfilePage/></ProtectedRoute> 
     },
     {
      path : "/owner/profile/addhostel",
      element :  <ProtectedRoute><AddHostel/></ProtectedRoute>
     },
     {
      path : "/owner/profile/updatehostel/:id",
      element : <ProtectedRoute><UpdateHostel/></ProtectedRoute>  // change to <UpdateHoste/>
     },
     {
      path: "/owner/profile/hostel",
      element: <ProtectedRoute><AddHostel/></ProtectedRoute>
     },
     {
      path: "/owner/profile/hostel/:id",
      element:  <ProtectedRoute><HostelDetails/></ProtectedRoute> 
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
