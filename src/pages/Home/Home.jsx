import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Home() {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleLogin = ()=>{
      navigate('/login')
    }

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {
        !user ? <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-44 mb-8"
            onClick={handleLogin}
          > Login</button> 
          : 
           <img src="https://placekitten.com/400/300"
        alt="A cute kitten"
        className="rounded-lg shadow-lg" />
      }
        
     
    </div>
   
  );
}

export default Home;
