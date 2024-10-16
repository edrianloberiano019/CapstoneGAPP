import './App.css';
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import HomePage from '../src/classes/HomePage';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './classes/LoginPage';
import Dashboard from './classes/Dashboard'
import AdminDashboard from './classes/AdminDashboard';



function App() {
  return (
    <Router>

      <ToastContainer />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/Homepage" />}/>
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/Loginpage" element={<LoginPage />} />
          <Route path="/educator" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />


        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
