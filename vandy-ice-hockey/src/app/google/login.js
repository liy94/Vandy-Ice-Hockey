import { GoogleLogin } from 'react-google-login';

const clientId = "884218967366-bdp7ovau82hdbati7a3kfanock9amqak.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res) => {
        console.log("Login Success! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login Failed! res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origon'}
                isSignedIn={true}
            />
            </div>
    )
}

export default Login