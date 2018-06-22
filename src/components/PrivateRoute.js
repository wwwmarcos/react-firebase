import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { firebase } from '../services'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route exact {...rest} render={props => (
    firebase.isAuthenticated() ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

export default PrivateRoute
