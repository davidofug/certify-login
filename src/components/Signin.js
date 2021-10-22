import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../ui-utilites/Alert';
import '../App.css';

export default function Signin() {

    const [error,setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const passwordRef = React.useRef()  
    const emailRef = React.useRef()

    const { signin, signInWithGoogle} = useAuth()
    const history = useHistory()

    const handleSubmit = async event => {
      event.preventDefault()
      
      const email = emailRef.current.value
      const password = passwordRef.current.value

      if( !email ) {
        return setError( 'Valid email required' )
      }

      try {
        setError('')
        setLoading( true )
        await signin(email, password)
        document.getElementById('signin').reset()
        history.push("/certify")
      }
      catch
      {
        setError( 'Failed to login' )
      }

      setLoading( false )

    }
  
    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithGoogle()
        history.push('/certify')

      } 
      catch
      {
        setError( 'Failed to login' )
      }
/* 
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setCurrentUser(user)

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      }); */

    }

    return (
      <div className="App">
        <div className="container">
            <h1>Sign In</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <form
              onSubmit={handleSubmit}
              action="/"
              method="post"
              id="signin"
            >
              <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    ref={emailRef}
                    required
                  />
              </div>
              <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    ref={passwordRef}
                    required
                  />
              </div>
              <div className="button">
                  <button disabled={loading} type="submit">Sign In</button>
                  <Link to="/forgot-password">Forgot Password?</Link>

              </div>
            </form>

            <div>
              <button onClick={handleGoogleSignIn}>Google</button>
            </div>
        </div>
        <p>Need an account? <Link to="/sign-up" >Sign Up</Link></p>
      </div>
    )
};