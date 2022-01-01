import './styles/style.scss';
// import Navbar from './components/Navbar';
// import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/HomePage';
import UpdateProfile from './components/UpdateProfile';
import { PrivateRoute } from './auth/PrivateRoute';
import HomePage from './pages/HomePage';
import Landing from './components/Landing';
import FinishProfile from './components/FinishProfile';
import AddCourse from './components/AddCourse';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<AddCourse />} />
          <Route path='/home' element={<HomePage />} />
          {/* <Route path='/' element={<Landing />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/finishprofile' element={<FinishProfile />} />
          <Route
            path='/updateprofile/:userId'
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
