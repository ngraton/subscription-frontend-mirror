import React from 'react';
import { Form, Button } from 'react-bootstrap';
import SubscriptionsAPI from '../api/SubscriptionsAPI';

class EditSubscriptionForm extends React.Component {
  state = {
    name: '',
    due_date: '',
    payment: null,
    interval: ''
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


  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.interval &&
        <Form id="subscription_form" onChange={this.onChange} className="px-5 py-4">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" defaultValue={this.state.name}/>
          </Form.Group>
          <Form.Group controlId="due_date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control required type="date" defaultValue={this.state.due_date} />
          </Form.Group>
          <Form.Group controlId="payment">
            <Form.Label>Cost</Form.Label>
            <Form.Control required type="number" defaultValue={this.state.payment}/>
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label>Payment Interval</Form.Label>
            <Form.Control required as="select" defaultValue={this.state.interval}>
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
              <option value="annual">annual</option>
            </Form.Control>
          </Form.Group>
          <Button onClick={this.onClickDone} type="submit" className="ml-2">Done</Button>
        </Form>
        }
      </div>
    )
  }
}

export default EditSubscriptionForm;