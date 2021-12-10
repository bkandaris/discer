import { Route, Navigate } from 'react-router';

export function PrivateRoute({ children }) {
  const accessToken = localStorage.getItem('token');
  //   if it doesn't exist take the user to login, if it does render the proper route
  return accessToken ? children : <Navigate to='/' />;
}
