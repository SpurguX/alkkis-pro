"Use strict";

import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = function({ children }) {
  const token = useSelector(state => state.authentication.token)
  console.log('token :>> ', token);
  const location = useLocation();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
