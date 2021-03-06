import './styles/style.scss';
// import Navbar from './components/Navbar';
// import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
// import Home from './pages/HomePage';
import UpdateProfile from './components/UpdateProfile';
import { PrivateRoute } from './auth/PrivateRoute';
import HomePage from './pages/HomePage';
import Landing from './components/Landing';
import FinishProfile from './components/FinishProfile';
import AddCourse from './components/AddCourse';
import ViewCourses from './components/ViewCourses';
import UpdateCourse from './components/UpdateCourse';
// import UpdateCourseCard from './components/UpdateCourseCard';
import ChangeCourse from './components/ChangeCourse';
import AddMeetup from './pages/AddMeetup';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/updatecourse' element={<UpdateCourse />} />
          <Route path='/viewcourses' element={<ViewCourses />} />
          <Route path='/addCourse' element={<AddCourse />} />
          <Route path='/addMeetup' element={<AddMeetup />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='update/:courseId' element={<ChangeCourse />} />
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
