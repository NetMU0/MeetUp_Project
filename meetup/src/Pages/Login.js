import React from "react";
import { GoogleLogin } from 'react-google-login';

const clientId = "855698334596-sqkm2smboe6kfh4ikk8fqvonjkh39rga.apps.googleusercontent.com";       

function Login() {
    const onSuccess = (res) => {
      console.log('Login Success: currentUser:', res.profileObj);
      alert(
        'Logged in successfully welcome ${res.profileObj.name}'
      );
    };
  
    const onFailure = (res) => {
      console.log('Login failed: res:', res);
      alert(
        'Failed to login'
      );
    };
  
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
      </div>
    );
  }
  
  export default Login;
