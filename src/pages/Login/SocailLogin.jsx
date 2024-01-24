import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const SocialLogIn = () => {
    const { googleSignIn,  } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL,role:'user' }
                return fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                });
            })
            .then(res => res.json())
           
    }

    return (
        <div>
            {/* add google login field */}

            <div className="w-full text-center my-8">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">Google</button>
            </div>


        </div>
    );
};

export default SocialLogIn;