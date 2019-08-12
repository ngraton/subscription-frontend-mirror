import React, { Component } from 'react';
import { Form, Button, Alert, InputGroup, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import SubscriptionsAPI from '../api/SubscriptionsAPI';
import UsersAPI from '../api/UsersAPI'

class Subscription extends Component {
  state = {
    name: '',
    due_date: '',
    interval:'',
    payment: 0,
    user: null,
    userDone: false,
    loggedin: true,
    submitted: false,
    submittedName: ''
  }

  componentDidMount() {
    UsersAPI.getUserByUsername(this.props.username)
      .then(jsonResponse => {
        if (jsonResponse[0]) {
          this.setState({
          user: jsonResponse[0].id
        })
      }
    })
  }

  onChange = async (e) => {
    await this.setState({
      name: document.getElementById('name').value,
      due_date: document.getElementById('due_date').value,
      interval: document.getElementById('interval').value,
      payment: document.getElementById('payment').value
    })
  }

  onClickAddAnother = (e) => {
    if (this.state.name && this.state.due_date && this.state.interval && Number.isInteger(Number(this.state.payment)) && this.state.payment > 0) {
      e.preventDefault()
      let subscriptionObj = {
        name: this.state.name,
        due_date: this.state.due_date,
        payment: this.state.payment,
        interval: this.state.interval,
        user: this.state.user
      }
      SubscriptionsAPI.addSubscription(subscriptionObj)
      this.setState({submitted: true, submittedName: this.state.name})
      document.getElementById("subscription_form").reset()
    }
  }

  onClickDone = (e) => {
    if (this.state.name && this.state.due_date && this.state.interval && Number.isInteger(Number(this.state.payment)) && this.state.payment > 0) {
      e.preventDefault()
      let subscriptionObj = {
        name: this.state.name,
        due_date: this.state.due_date,
        payment: this.state.payment,
        interval: this.state.interval,
        user: this.state.user
      }
      SubscriptionsAPI.addSubscription(subscriptionObj)
        .then(_res => this.setState({userDone: true}))
    }
  }


  render () {
    const styleobj = {
      paddingBottom: '1%'
    }
    return (
      <div align='center' className='border border-primary' style={styleobj}>
        {this.state.userDone && window.location.assign('/')}
        {this.state.loggedin === false && <Redirect to='/login'/>}
        <Container>
        {this.state.submitted && <Alert variant="success" onClose={() => this.setState({submitted: false})} dismissible>Your subscription to {this.state.submittedName} was added</Alert>}
         <Form id="subscription_form" onChange={this.onChange} className="w-50 p-3" align='left'>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Who do you pay for this subscription?"/>
            {/* <Form.Text>^What is the name of the company you pay for this subscription?^</Form.Text> */}
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label>Payment Interval</Form.Label>
            <Form.Text>Is the payment schedule monthly, quarterly, or annually?</Form.Text>
            <Form.Control required as="select">
              <option></option>
              <option>monthly</option>
              <option>quarterly</option>
              <option>annual</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="due_date">
            <Form.Label>Due Date</Form.Label>
            <Form.Text>When is your next payment due?</Form.Text>
            <Form.Control required type="date" align="center" />
          </Form.Group>
          <Form.Group controlId="payment">
            <Form.Label>Cost</Form.Label>
            <Form.Text>How much is your payment?</Form.Text>
            <InputGroup className="mb-3">
              <InputGroup.Prepend><InputGroup.Text>$</InputGroup.Text></InputGroup.Prepend>
              <Form.Control type="number" pattern="[0-9]" min="1" step="1" placeholder="Amount (to the nearest dollar)" required/>
              <InputGroup.Append><InputGroup.Text>.00</InputGroup.Text></InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Button onClick={this.onClickAddAnother} type="submit">Add Another</Button>
          <Button onClick={this.onClickDone} type="submit" className="ml-2">Save Subscription</Button>
        </Form>
        </Container>
      </div>
    )
  }
}

export default Subscription;
