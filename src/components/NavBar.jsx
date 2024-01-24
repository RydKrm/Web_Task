import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const {logOut,user} = useContext(AuthContext);

  const handleLogout = ()=>{
    localStorage.removeItem('testingUser');
    logOut()
    navigate('/login')
  } 

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Your Logo</div>
        <div className="flex items-center space-x-4">
          {!user ? 
          <Link to='/login' className="text-white hover:text-gray-300">Login</Link>
          :
          <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
