import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dashboard from './pages/Dashboard';
import ListUsers from './pages/users/List';
import Login from './components/authUser/Login';
import Register from './components/authUser/Register';
import PageNotFound from './components/authUser/PageNotFound';

function App() {
  const { loading } = useSelector(state => state.loaderReducer);
  return (
    <div className="App">
      {/* Loader */}
      {
        loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >


          <CircularProgress color="inherit" />
        </Backdrop>
      }
      {/* Routing paths configuration */}
      <Router>
        <Routes>
          {/* ----------------- */}
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/listusers" element={<ListUsers />} />
          </Route>
          {/* ----------------- */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

/* ---------------------------------- */
/* Functionality for Protected Routes */
const useAuth = () => {
  const user = localStorage.getItem('user');
  if (user) { return true } else { return false }
}

const ProtectedRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />
}
