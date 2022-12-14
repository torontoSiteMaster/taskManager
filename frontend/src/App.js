import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dashboard from './pages/Dashboard';
import ListUsers from './pages/users/ListUsers';
import EditUser from './pages/users/EditUser';
import UserProfile from './pages/users/UserProfile';
import Login from './components/authUser/Login';
import Register from './components/authUser/Register';
import PageNotFound from './components/authUser/PageNotFound';
import Copyright from './components/Copyright';
import CreateTask from './pages/tasks/CreateTask';
import AssignTask from './pages/tasks/AssignTask';

function App() {
  const { loading } = useSelector(state => state.loaderReducer);
  return (
    <div className="App">
      {/* Loader */}
      {
        loading &&
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
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
            <Route path="/edituser/:id" element={<EditUser />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/addtask" element={<CreateTask />} />
            <Route path="/assigntask/:id" element={<AssignTask />} />
          </Route>
          {/* ----------------- */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
      <Copyright sx={{
        mb: 1,
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
      />
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
