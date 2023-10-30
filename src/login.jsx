
// import GoogleLogin from 'react-google-login';
import './login.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


function Login() {



    const navigate = useNavigate()


    const handleLogin = async (response) => {
        console.log(response.sub)
        if (response.credential != null) {
            const USER_CREDENTIAL = jwtDecode(response.credential);
            await localStorage.setItem('userId', USER_CREDENTIAL.sub)
            navigate("/chatbot")
        }



    };

    return (
        <div className="login-container">
            <div className='borda'>
                <div className='centro'>
                    <h2>SEJA BEM VINDO</h2>
                    <div className='input-email'>


                        <GoogleOAuthProvider clientId="87138806108-c66iommqj1mdk9ls60743jehsvrhsio6.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleLogin}
                            
                            />



                        </GoogleOAuthProvider>




                    </div>


                </div>


            </div>

        </div>
    );
}

export default Login;
