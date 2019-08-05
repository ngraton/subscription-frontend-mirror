import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
// import './App.css';

function App() {
  function PlaceHolder() {
    return (
      <div/>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/addsubscription" component={PlaceHolder}/>
      </Switch>
    </Router>
  );
}

export default App;
