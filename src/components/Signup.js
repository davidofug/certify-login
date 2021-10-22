import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../ui-utilites/Alert';

export default function Signup() {

    const [error,setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const passwordRef = React.useRef()  
    const confirmPasswordRef = React.useRef()
    const emailRef = React.useRef()

    const { signup, currentUser, signInWithGoogle} = useAuth()
    const history = useHistory()

    const handleGoogleSignUp = async () => {
      try {
        const result = await signInWithGoogle()
        history.push('/certify')

      } 
      catch
      {
        setError( 'Failed to login' )
      }
    }

    const handleSubmit = async event => {
      event.preventDefault()

      const password = passwordRef.current.value
      const password2 = confirmPasswordRef.current.value
      const email = emailRef.current.value

      if( !email ) {
        return setError( 'Valid email required' )
      }

      if( password !== password2 ) {
        return setError( 'Passwords do not match' )
      }

      try {
        setError('')
        setLoading( true )
        await signup(email, password)
        document.getElementById('signup').reset()
        history.push('/certify')
      }
      catch
      {
        setError( 'Failed to create an account' )
      }

      setLoading( false )

    }
  
    return (
      <div className="App">
        <div className="container">
            <h1>Sign Up</h1>

            {currentUser && currentUser.email}
            {error && <Alert variant="danger">{error}</Alert>}

            <form
              onSubmit={handleSubmit}
              action="/"
              method="post"
              id="signup"
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
              <div className="field">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                    required
                  />
              </div>
              <div className="button">
                  <button disabled={loading} type="submit">Sign Up</button>
              </div>
            </form>
            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
        </div>
        <p>Have an account? <Link to="/">Log In</Link></p>
      </div>
    )
};