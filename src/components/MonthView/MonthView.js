import React, { Component } from 'react'
import SingleSubscription from '../SingleSubscription/SingleSubscription'
import { Container, Row, Col } from 'react-bootstrap'

class MonthView extends Component {

  compare(a, b){
    const dateA = new Date(a.due_date)
    const dateB = new Date(b.due_date)

    if (dateA.getDate() < dateB.getDate()){
      return -1
    } else {
      return 1
    }
  }

  getMonthlyTotal(){
    let totalCost = 0
    for (let i=0; i < this.props.subscriptions.length; i++){
      let subscription = this.props.subscriptions[i]
      totalCost += subscription.payment
    }
    return totalCost
  }

  showSubscriptions(monthCode) {
    const subscriptions = [...this.props.subscriptions].sort(this.compare)
    return subscriptions.map((subscriptionObj, index) => {
      return <SingleSubscription key={index} subscription={subscriptionObj} monthCode={monthCode}/>
    })
  }

  render() {
    return (
      <Container>
        <h2>{this.props.month}</h2>
        <Container>
          {this.props.subscriptions.length > 0 && this.showSubscriptions(this.props.monthCode)}
        </Container>
        <Row>
        <Col></Col>
          <Col>
            <h3>Total $ {this.getMonthlyTotal()}</h3>
          </Col>
        </Row>
        <hr></hr>
      </Container>
    )
  }
}

export default MonthView
