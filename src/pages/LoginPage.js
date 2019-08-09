import React, { Component } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        {this.state.redirectHome && window.location.assign('/')}
        <div align='center' className='border border-primary'>
        {this.state.errorMessage && <Alert variant='danger'>{this.state.errorMessage}</Alert>}
        <Container className="w-50 p-3" >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUserName">
            <div className="form-row align-items-left">
            <Form.Label>USERNAME</Form.Label>
            </div>
            <Form.Control type="text" placeholder="username" onChange={this.onChange} required/>
          </Form.Group>
          <Form.Group controlId="formPassword">
          <div className="form-row align-items-left">
            <Form.Label>PASSWORD</Form.Label>
            </div>
            <Form.Control type="password" placeholder="password" onChange={this.onChange} required/>
          </Form.Group>
            <Button variant="primary" size="lg" block type="submit">
              Login
            </Button>
        </Form>
        </Container>
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        <p>For account deletion or password reset, please email
           <a href='mailto: admin@subreckoner.com'> admin@subreckoner.com </a>
        </p>
        </div>
      </Container>
    )
  }
}

export default LoginPage;
