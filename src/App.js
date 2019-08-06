import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import { Navbar } from 'react-bootstrap'
import SubscriptionForm from './forms/SubscriptionForm';
import DateCalculator from './components/Calculations/DateCalculator';
// import './App.css';

function App() {
  function PlaceHolder() {
    return (
      <div/>
    )
  }

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Name of App</Navbar.Brand>
      </Navbar>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/parse" component={DateCalculator}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/addsubscription" component={SubscriptionForm}/>
      </Switch>
    </Router>
  );
}

export default App;
