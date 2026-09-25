
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Launchpad from './pages/Launchpad';
import Chatbot from './pages/Chatbot';
import Scaling from './pages/Scaling';
import Mentorship from './pages/Mentorship';

function ProtectedRoute({ children }) {
  const email = localStorage.getItem("user_email");
  return email ? children : <Navigate to="/Login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>

        <Route path='/Profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/Launchpad' element={<ProtectedRoute><Launchpad/></ProtectedRoute>}/>
        <Route path='/Dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/scaling' element={<ProtectedRoute><Scaling/></ProtectedRoute>}/>
        <Route path='/Chatbot' element={<ProtectedRoute><Chatbot/></ProtectedRoute>}/>
        <Route path='/Mentorship' element={<ProtectedRoute><Mentorship/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}


export default App;
