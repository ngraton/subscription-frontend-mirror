import React, { Component } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import AuthenticationsAPI from '../api/AuthenticationsAPI';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    redirectHome: false,
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
    AuthenticationsAPI.login(this.state.username, this.state.password)
      .then(response => {
        if (response.ok) {
          return response.json()
            .then(_jsonResponse => {
              localStorage.setItem('username', this.state.username)
              this.props.setUsername(this.state.username)
              this.setState({redirectHome: true})
            })
        } else {
          return response.json()
            .then(jsonResponse => this.setState({errorMessage: jsonResponse["non_field_errors"]}))
        }
      }
    )
  }

  render () {
    return (
      <Container>
        {this.state.redirectHome && <Redirect to='/' />}
        <div align='center' className='border border-primary'>
        {this.state.errorMessage && <Alert variant='danger'>{this.state.errorMessage}</Alert>}
        <Container className="w-50 p-3" >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>username</Form.Label>
            <Form.Control type="text" placeholder="username" onChange={this.onChange} required/>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={this.onChange} required/>
          </Form.Group>
            <Button variant="primary" size="lg" block type="submit">
              Login
            </Button>
        </Form>
        </Container>
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </Container>
    )
  }
}

export default LoginPage;
