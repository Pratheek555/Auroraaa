


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from 'pages/dashboard';

import Login from 'pages/authentication/Login';
import Signup from 'pages/authentication/Signup';
import ProtectedRoute from 'components/common/ProtectedRoute';

const App = () => {

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Aurora/authentication/login' element={<Login />}></Route>
        <Route path='/Aurora/authentication/sign-up' element={<Signup />}></Route>

        <Route
          path='/Aurora'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
};

export default App;
