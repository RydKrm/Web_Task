import axios from 'axios';
import  { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogIn from './SocailLogin';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { googleSignIn,createUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.length && password.length) {
      axios.post('http://localhost:5000/login',{email,password})
      .then(res=>{
        if(res.data){
        createUser(email, password)
      .then((result) => {
        navigate('/')
        console.log(result);
      })
        } else {
          alert('user already exits ');
        }
      })
      
    } else {
      setError('Invalid email or password');
    }
  };

      const handleGoogleSignIn = () => {
        googleSignIn()
          .then(result => {
              const loggedInUser = result.user;
              console.log(loggedInUser)
              const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL,role:'user' }
              return fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
              });
          })
          .then(res => {
            res.json();
            console.log('res data ', res.data);
            navigate('/')
          })
          .catch(err => console.log(err))
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md md:w-96 w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign in with</p>
              <SocialLogIn></SocialLogIn>
          </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full mt-5"
            onClick={handleGoogleSignIn}
          >
            Google Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
