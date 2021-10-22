
import * as React from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../ui-utilites/Alert';
import '../App.css';

export default function Forgotpassword() {

    const [error,setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const emailRef = React.useRef()

    const { resetPassword } = useAuth()

    const handleSubmit = async event => {
      event.preventDefault()
      
      const email = emailRef.current.value

      if( !email ) {
        return setError( 'Valid email required' )
      }

      try {
        setError('')
        setLoading( true )
        await resetPassword(email)
        setMessage('Check your inbox for password reset instructions.')
        document.getElementById('resetpassword').reset()
      }
      catch
      {
        setError( 'Failed to reset password' )
      }

      setLoading( false )

    }
  
    return (
      <div className="App">
        <div className="container">
            <h1>Reset Password</h1>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <form
              onSubmit={handleSubmit}
              action="/"
              method="post"
              id="resetpassword"
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
              <div className="button">
                  <button disabled={loading} type="submit">Reset Password</button>
                  Remember Password? <Link to="/sign-in">Sign In</Link>

              </div>
            </form>
        </div>
        <p>Need an account? <Link to="/sign-up" >Sign Up</Link></p>
      </div>
    )
};