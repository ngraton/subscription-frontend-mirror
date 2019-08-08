import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
        {this.props.edit && <Col><Link to={`/editsubscription/${this.props.subscription.id}`}>Edit/Delete</Link> </Col>}
      </Row>
    )
  }
}

export default SingleSubscription
