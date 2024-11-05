import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss'; 
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../redux/authslice.js"; 
import Button from '@mui/material/Button';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import HostelImage from "../images/hostel.png";


function Navbar (){
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        }
    }

    return (
        <div className="navbar">
            <div className="logo">
                <img src={HostelImage} alt="" srcset="" />
                <h1>Find My Hostel</h1>
            </div>
            <div className="left"> 

                {
                    !user ?  (
                        <>
                        <Link to="/"><a href="">Home</a></Link>
                        <Link to="/search"><a href="#">Search</a></Link>
                     <Link to="/login"><button className='outline'>LogIn</button></Link>
                      <Link to="/signup"><button className='contain'>SignUp</button></Link>
                    
                    </>
                    ) : (
                        user.role == 'student' ? (
                            <>
                              <Link to="/"><a href="">Home</a></Link>
                              <Link to="/search"><a href="">Search</a></Link>
                             <button className='outline' onClick={logoutHandler}>SignOut</button>
                             <Link to="/profile"><button className='contain'>Profile</button></Link>
                            </>

                        ) : (
                            <>
                              <button className='outline' onClick={logoutHandler}>SignOut</button>
                              <Link to="/owner/profile"><button className='contain'>Profile</button></Link>
                            </>
                        )
                    )
                }
                     
                
            </div>
        </div>
    ); 
}

export default Navbar;