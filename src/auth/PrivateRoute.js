import { Route, Navigate } from 'react-router';
import Cookies from 'js-cookie';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       localStorage.getItem('token') ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to='/login' />
//       )
//     }
//   />
// );

export function PrivateRoute({ children }) {
  const jwtCookie = Cookies.get('username');
  return jwtCookie ? children : <Navigate to='/login' />;
}
