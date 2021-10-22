import * as React from 'react'
import { useHistory, Link } from 'react-router-dom';
import Alert from "../ui-utilites/Alert";
import {useAuth} from '../contexts/AuthContext';

export default function Certify() {
    const [error, setError] = React.useState()
    const history = useHistory()

    const {currentUser, signout} = useAuth()

    async function handleLogout() {
       setError('')

       try {
           await signout()
            history.push('/sign-in')
       }catch {
           setError('Failed to logout')
       }
    }

    return (
        <div>
            <h1>You're about to certify</h1>
            
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>

            {error && <Alert variant="danger">Failed to logout</Alert>}

            <Link to="/update-profile">Update profile</Link>

            <p>
                <a href="#" onClick={handleLogout}>Log Out</a>
            </p>
        </div>
    )
}