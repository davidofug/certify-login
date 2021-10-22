import * as React from 'react'
import app from '../firebase'

import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const AutheContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
    return React.useContext(AutheContext )
}

export default function AuthProvider ({children}) {

    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)

    const auth = getAuth()

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signInWithGoogle() {
       return signInWithPopup(auth, provider)
    }

    function signout(){
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
    }

    function updateMyEmail(email) {
        return updateEmail(currentUser,email)
    }

    function updateMyPassword(password) {
        return updatePassword(currentUser, password)
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setLoading(false)
            setCurrentUser(user)
        })

        return unsubscribe
    },[])

    onAuthStateChanged(auth, user => {
        setCurrentUser(user)
    })

    const value = { 
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updateMyEmail,
        updateMyPassword,
        signInWithGoogle
    }

    return (
        <AutheContext.Provider value={value}>
            {!loading && children}
        </AutheContext.Provider>
    )
}  
