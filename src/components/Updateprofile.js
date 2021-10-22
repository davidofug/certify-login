import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../contexts/AuthContext';
import Alert from '../ui-utilites/Alert';

export default function UpdateProfile() {

    const [error,setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')

    const passwordRef = React.useRef()  
    const confirmPasswordRef = React.useRef()
    const emailRef = React.useRef()

    const { currentUser, updateMyEmail, updateMyPassword} = useAuth()

    const history = useHistory()

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

      const promises = []

      setLoading(true)

      if(email !== currentUser.email) {
        promises.push(updateMyEmail(email))
      }

      if(password) {
        promises.push(updateMyPassword(password))
      }

      Promise.all(promises).then(() => {
        setMessage('Profile updated')

      }).catch((error) => {
        console.error(error)
        setError('Failed to update account')

      }).finally(()=>{
        setLoading(false)
      })

    }
  
    return (
      <div className="App">
        <div className="container">

            <h1> Update profile</h1>
            <p><Link to="/certify">Certify</Link></p>

            {currentUser && currentUser.email}
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <form
              onSubmit={handleSubmit}
              action="/"
              method="post"
              id="update"
            >
              <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                  />
              </div>

              <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Leave blank to keep current password"
                    ref={passwordRef}
                  />
              </div>

              <div className="field">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    placeholder="Leave blank to keep current password"
                    ref={confirmPasswordRef}
                  />
              </div>

              <div className="button">
                  <button disabled={loading} type="submit">Update</button>
              </div>
            <Link to="/certify">Cancel</Link>
            </form>
        </div>
      </div>
    )
};