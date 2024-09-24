import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './classes/HomePage';
import Login from './classes/LoginPage';
import Dashboard from './classes/Dashboard'; 
import StudentTracker from './classes/StudentTracker';



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>     
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/student-tracker"> {App.js}
            <StudentTracker />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
