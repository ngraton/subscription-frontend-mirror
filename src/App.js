import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Navbar } from 'react-bootstrap'
import SubscriptionForm from './forms/SubscriptionForm';
// import './App.css';

function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username'))

  return (
    <Router>
      {/* {!username && <Redirect to="/login" />} */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Name of App</Navbar.Brand>
      </Navbar>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/addsubscription" component={SubscriptionForm}/>
      </Switch>
    </Router>
  );
}

export default App;
