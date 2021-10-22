import * as React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css';

import Signup from './components/Signup';
import Signin from './components/Signin';
import ResetPassword from './components/Resetpassword';
import UpdateProfile from './components/Updateprofile';
import Dashboard from './components/Dashboard';
import Certify from './components/Certify';
import NotFound from './components/Notfound';
import PrivateRoute from './components/Privateroute';
import AuthProvider from './contexts/AuthContext';

export default function AppRouter () {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/certify">
              <Certify />
          </PrivateRoute>
          <PrivateRoute path="/update-profile">
            <UpdateProfile />
          </PrivateRoute>
          <Route exact path="/forgot-password">
            <ResetPassword />
          </Route>
          <Route exact path="/sign-in">
            <Signin />
          </Route>
          <Route exact path="/sign-up">
            <Signup />
          </Route>
          <Route exact path="/">
            <Signin />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}