import { GoogleLogout } from 'react-google-login';

const clientId = "884218967366-bdp7ovau82hdbati7a3kfanock9amqak.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Log out successful")
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
                />
        </div>
    )
}

export default Logout