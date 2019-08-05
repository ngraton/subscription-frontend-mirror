import React, { Component } from 'react';
import { Form, Container } from 'react-bootstrap';



class LoginPage extends Component {
  state = {
    username: ''
  }
  
  onChange = async (e) => {
    await this.setState({username:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
   //Call API with post request with username as data 
  }
  render () {
    return (
      <Container>
        <div align='center'>
        <Form>
          <Form.Group controlId="formUserName">
            <Form.Label>userName</Form.Label>
            <Form.Control type="text" placeholder="username" onChange={this.onChange}/>
          </Form.Group>
        </Form>
        <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Container>
    )
  }
}
export default LoginPage;