import './styles/style.scss';
// import Navbar from './components/Navbar';
// import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './pages/Home';
import { PrivateRoute } from './auth/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
