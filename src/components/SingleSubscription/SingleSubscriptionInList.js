import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

const styles = {
  subscription_text: {
    fontWeight: 'normal',
    fontSize: '20px'
  }
}

class SingleSubscription extends Component {

  render() {
    return (
      <Row>
        <Col><h3 style={styles.subscription_text}>{this.props.subscription.name}</h3></Col>
        <Col><h3 style={styles.subscription_text}>Due {this.props.subscription.interval}</h3></Col>
        <Col><h3 style={styles.subscription_text}>$ {this.props.subscription.payment}</h3></Col>
        {this.props.edit && <Col><a href={`/editsubscription/${this.props.subscription.id}`}>Edit/Delete</a> </Col>}
      </Row>
    )
  }
}

export default SingleSubscription
