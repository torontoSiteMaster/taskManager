import './App.css';
import { BrowserRouter as Router, Routes, Redirect, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Login from './components/authUser/Login';
import Register from './components/authUser/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Header />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
