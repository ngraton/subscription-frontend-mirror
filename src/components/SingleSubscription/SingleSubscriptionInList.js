import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './SingleSubscriptionInList.css'

class SingleSubscription extends Component {

  render() {
    return (
      <Row className='Subscription-text'>
        <Col><h3>{this.props.subscription.name}</h3></Col>
        <Col><h3>Due {this.props.subscription.interval}</h3></Col>
        <Col><h3>$ {this.props.subscription.payment}</h3></Col>
        {this.props.edit && <Col><a href={`/editsubscription/${this.props.subscription.id}`}>Edit/Delete</a></Col>}
      </Row>
    )
  }
}

export default SingleSubscription
