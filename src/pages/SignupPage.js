import React, { Component } from 'react';
import { Form, Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthenticationsAPI from '../api/AuthenticationsAPI';
import ProfilesAPI from '../api/ProfilesAPI';
import UsersAPI from '../api/UsersAPI';
class SignupPage extends Component {
 state = {
   username: '',
   password: '',
   userNumber: '',
   redirectNewSub: false,
   errorMessage: '',
   phoneNumber: false,
   userId: null
 }

 onChange = async (e) => {
   await this.setState({
     username: document.getElementById('formUserName').value,
     password: document.getElementById('formPassword').value
   })
 }

 onChangePhone = async (e) => {
  await this.setState({
    userNumber: document.getElementById('formUserNumber').value
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
            if (this.state.userNumber) {
              UsersAPI.getUserByUsername(this.state.username)
                .then(jsonResponse => {
                  ProfilesAPI.addPhoneNumber(jsonResponse[0].id, this.state.userNumber.split('-').join(''))
                  .then(_res => this.setState({redirectNewSub: true}))
                })
            } else {
              this.setState({redirectNewSub: true})
            }
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
       {this.state.redirectNewSub && window.location.assign('/addsubscription')}
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

         <Form.Group id="formGridCheckbox">
          <Form.Check onClick={(e) => this.setState({phoneNumber: !this.state.phoneNumber})} type="checkbox" label="Sign up for push notification (optional)" />
         </Form.Group>

        {this.state.phoneNumber && 
         <Form.Group controlId="formUserNumber">
          <div className="form-row align-items-left">
            <Form.Label>PHONE-NUMBER (xxx-xxx-xxxx)</Form.Label>
          </div>
          <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx" onChange={this.onChangePhone} required/>
         </Form.Group>
        }

         <Button variant="primary" size="lg" block type="submit">
             Sign Up
         </Button>
       </Form>
       </Container>

       <p>Already have an account? <Link to='/login'>Login</Link></p>
       <p>For account deletion or password reset, please email <a href='mailto: admin@subreckoner.com?subject=Account%20Inquiry'>admin@subreckoner.com</a></p>
       </div>
     </Container>
   )
 }
}
export default SignupPage;
