import React, { Component } from 'react';
import { Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AuthenticationsAPI from '../api/AuthenticationsAPI';

class SignupPage extends Component {
  state = {
    username: '',
    password: '',
    redirectNewSub: false,
  }
  
  onChange = async (e) => {
    await this.setState({
      username: document.getElementById('formUserName').value,
      password: document.getElementById('formPassword').value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    AuthenticationsAPI.registration(this.state.username, this.state.password)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw true
        }
      })
      .then(jsonResponse => {
        // localStorage.setItem('token', jsonResponse.token)
        localStorage.setItem('username', this.state.username)
        this.props.setUsername(this.state.username)
        this.setState({redirectNewSub: true})
        // setToken(jsonResponse.token)
      })
      .catch(_error => console.log(_error))
  }

  logout(e) {
    e.preventDefault()
    AuthenticationsAPI.logout()
      .then(res => res.json())
      .then(jsonRes => console.log(jsonRes))
  }

  render () {
    return (
      <Container>
        {this.state.redirectNewSub && <Redirect to='/addSubscription' />}
        <div align='center'>
        {this.state.loginFailed && <p>Unable to log in with provided credentials. Please try again.</p>}
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>username</Form.Label>
            <Form.Control type="text" placeholder="username" onChange={this.onChange}/>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={this.onChange}/>
          </Form.Group>
          <button type="submit">Submit</button>
        </Form>
        </div>
        <button onClick={this.logout}>logout</button>
      </Container>
    )
  }
}
export default SignupPage;
