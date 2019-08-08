import React, { Component } from 'react';
import { Form, Container, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import AuthenticationsAPI from '../api/AuthenticationsAPI';

class SignupPage extends Component {
  state = {
    username: '',
    password: '',
    redirectNewSub: false,
    errorMessage: ''
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
          .then(_jsonResponse => {
            localStorage.setItem('username', this.state.username)
            this.props.setUsername(this.state.username)
            this.setState({redirectNewSub: true})
          })
        } else {
          return response.json()
          .then(jsonResponse => this.setState({errorMessage: jsonResponse.username || jsonResponse.password1}))
        }
      }
    )
  }

  render () {
    return (
      <Container>
        {this.state.redirectNewSub && <Redirect to='/addSubscription' />}
        <div align='center'>
        <h2>Sign Up</h2>
        {this.state.errorMessage && <Alert variant='warning'>{this.state.errorMessage}</Alert>}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>username</Form.Label>
            <Form.Control type="text" placeholder="username" onChange={this.onChange} required/>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={this.onChange} required/>
          </Form.Group>
          <button type="submit">Submit</button>
        </Form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </Container>
    )
  }
}

export default SignupPage;
