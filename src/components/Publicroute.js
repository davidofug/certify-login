
import * as React from 'react';
import {
    Route,
    Redirect,
    useHistory
} from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute({children, ...rest}) {

    const {currentUser} = useAuth()
    const history = useHistory()

    return (
      <Route
        {...rest}
        render={({location}) => 
          currentUser ?
            (
              <Redirect 
                to={{
                  pathname: "/certify",
                  state:{from:location}
                }}
              />
            ):
            (children)
        }
      />
    )
  }