import '../styles/Navbar.scss'; 
import Button from '@mui/material/Button';
function Navbar (){
    const user=1; 
    return (
        <div className="navbar">
            <div className="logo">
                <h1><p>Find My Hostel</p></h1>
            </div>
            <div className="left"> 

                {
                    user==1 ?  (
                        <>
                     <a href="#">Home</a> 
                     <a href="#">Search</a> 
                    <button className='outline'>LogIn</button>
                    <button className='contain'>SignUp</button>
                    </>
                    ) : (
                        user.role == 'student' ? (
                            <>
                             <a href="#">Home</a> 
                             <a href="#">Search</a>
                             <button className='outline'>SignOut</button>
                             <button className='contain'>Profile</button>
                            </>

                        ) : (
                            <>
                              <button className='outline'>SignOut</button>
                              <button className='contain'>Profile</button>
                            </>
                        )
                    )
                }
                     
                
            </div>
        </div>
    ); 
}

export default Navbar;