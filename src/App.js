import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Nav, Navbar } from 'react-bootstrap'
import SubscriptionForm from './forms/SubscriptionForm';
import DateCalculator from './logic/DateCalculator';
// import './App.css';

function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username'))

  return (
    <Router>
      {!username && <Redirect to="/login" />}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>SubReckoner</Navbar.Brand>
        <Nav>{username}</Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" render={
          props => <HomePage {...props} setUsername={setUsername} />
        }/>
        <Route exact path="/login" render={
          props => <LoginPage {...props} setUsername={setUsername} />
        }/>
        <Route exact path='/parse' component={DateCalculator} />
        <Route exact path="/addsubscription" render={
          props => <SubscriptionForm {...props} setUsername={setUsername} username={username} />
        }/>
      </Switch>
    </Router>
  );
}

export default App;
