import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import SubscriptionsAPI from '../api/SubscriptionsAPI';
import './Form.css'

class EditSubscriptionForm extends React.Component {
  state = {
    name: '',
    due_date: '',
    payment: null,
    interval: '',
    redirect: false
  }

  componentDidMount() {
    SubscriptionsAPI.getSubscriptionById(this.props.match.params.subscriptionID)
    .then(jsonResponse => {this.setState({
      name: jsonResponse.name,
      due_date: jsonResponse['due_date'],
      payment: jsonResponse.payment,
      interval: jsonResponse.interval
    })} )
  }

  onChange = async (e) => {
    await this.setState({
      name: document.getElementById('name').value,
      due_date: document.getElementById('due_date').value,
      interval: document.getElementById('interval').value,
      payment: document.getElementById('payment').value
    })
  }

  onClickDone(e) {
    if (this.state.name && this.state.due_date && this.state.interval && Number.isInteger(Number(this.state.payment)) && this.state.payment > 0) {
      e.preventDefault()
      let subscriptionObj = {
        name: this.state.name,
        due_date: this.state.due_date,
        payment: this.state.payment,
        interval: this.state.interval,
        user: this.state.user
      }
  
      SubscriptionsAPI.editSubscription(this.props.match.params.subscriptionID, subscriptionObj)
        .then(_res => this.setState({redirect: true}))
    }
  }

  onClickDelete(e) {
    SubscriptionsAPI.deleteSubscription(this.props.match.params.subscriptionID)
      .then(_response => {
        this.setState({redirect: true})
      })
  } 

  render() {
    const styleobj = {
      paddingBottom: '1%'
    }
    return (
      <div align='center' className='border border-primary' style={styleobj}>
        {this.state.redirect && window.location.assign('/subscriptionlist')}
        {this.state.interval &&
        <div>
        <Form id="subscription_form" onChange={this.onChange} className="w-50 p-3" align='left'>
          <Form.Group controlId="name">
            <Form.Label className="toBold">Name</Form.Label>
            <Form.Control required type="text" defaultValue={this.state.name}/>
          </Form.Group>
          <Form.Group controlId="due_date">
            <Form.Label className="toBold">Due Date</Form.Label>
            <Form.Control required type="date" defaultValue={this.state.due_date} />
          </Form.Group>
          <Form.Group controlId="payment">
            <Form.Label className="toBold">Cost</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend><InputGroup.Text>$</InputGroup.Text></InputGroup.Prepend>
              <Form.Control required type="number" pattern="[0-9]" min="1" step="1" defaultValue={this.state.payment} placeholder="Amount (to the nearest dollar)"/>
              <InputGroup.Append><InputGroup.Text>.00</InputGroup.Text></InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label className="toBold">Payment Interval</Form.Label>
            <Form.Control required as="select" defaultValue={this.state.interval}>
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
              <option value="annual">annual</option>
            </Form.Control>
          </Form.Group>
          <Button onClick={(e) => this.onClickDone(e)} type="submit" className="ml-2">Save</Button>
        </Form>
        <Button onClick={(e) => this.onClickDelete(e)} className="ml-2 mt-3" variant="danger">Delete this entire subscription</Button>
        </div>
        }
      </div>
    )
  }
}

export default EditSubscriptionForm;
