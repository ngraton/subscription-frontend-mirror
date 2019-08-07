import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddSubscriptionForm from './forms/AddSubscriptionForm';
import AppNavBar from './components/AppNavBar/AppNavBar';
import EditSubscriptionForm from './forms/EditSubscriptionForm';
import SubscriptionListPage from './pages/SubscriptionListPage';
import SignupPage from './pages/SignupPage';
// import './App.css';

function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username'))

  return (
    <Router>
      {/* this line needs to change so people can sign up */}
      {!username && <Redirect to="/login" />}
      <AppNavBar setUsername={setUsername} username={username}/>
      <Switch>
        <Route exact path="/" render={
          props => <HomePage {...props} username={ username }/>
        }/>
        <Route exact path="/login" render={
          props => <LoginPage {...props} setUsername={ setUsername } />
        }/>
        <Route exact path="/signup" render={
          props => <SignupPage {...props} setUsername={setUsername} />
        }/>
        <Route exact path="/addsubscription" render={
          props => <AddSubscriptionForm {...props} username={ username }/>
        }/>
        <Route exact path="/subscriptionlist" render={props => <SubscriptionListPage {...props} username={ username } />} />
        <Route exact path="/editsubscription/:subscriptionID" render={props => <EditSubscriptionForm {...props} username={ username } />}/>
      </Switch>
    </Router>
  );
}

export default App;
