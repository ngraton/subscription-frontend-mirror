import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './SingleSubscriptionInList.css'

class SingleSubscription extends Component {

  render() {
    return (
      <Row>
        <Col><p className='Subscription-text'>{this.props.subscription.name}</p></Col>
        <Col><p className='Subscription-text'>Due {this.props.subscription.interval}</p></Col>
        <Col><p className='Subscription-text'>$ {this.props.subscription.payment}</p></Col>
        {this.props.edit && <Col><a href={`/editsubscription/${this.props.subscription.id}`}>Edit/Delete</a></Col>}
      </Row>
    )
  }
}

export default SingleSubscription
