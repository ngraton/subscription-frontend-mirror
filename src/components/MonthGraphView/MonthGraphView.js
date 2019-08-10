import React, { Component } from 'react'
import SingleSubscription from '../SingleSubscription/SingleSubscription'
import { Container, Row, Col } from 'react-bootstrap'
import '../../../node_modules/react-vis/dist/style.css';
import { RadialChart, DiscreteColorLegend } from 'react-vis';

class MonthGraphView extends Component {
  state = {
    data: []
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
    return this.props.subscriptions.map((subscriptionObj, index) => {
      return <SingleSubscription key={index} subscription={subscriptionObj} monthCode={monthCode}/>
    })
  }

  chartData() {
    const colors = ['#ff0000', '#0000ff', '#3cb371', '#ee82ee', '#ffa500', '#6a5acd',
      '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600',
      '#000099',	'#330099',	'#660099',	'#990099',	'#CC0099',	'#FF0099',
      '#003399',	'#333399',	'#663399',	'#993399',	'#CC3399',	'#FF3399',
      '#006699',	'#336699',	'#666699',	'#996699',	'#CC6699',	'#FF6699',
      '#009999',	'#339999',	'#669999',	'#999999',	'#CC9999',	'#FF9999',
      '#00CC99',	'#33CC99',	'#66CC99',	'#99CC99',	'#CCCC99',	'#FFCC99',
      '#00FF99',	'#33FF99',	'#66FF99',	'#99FF99',	'#CCFF99',	'#FFFF99',
      ]
    return this.props.subscriptions.map((subscriptionObj, index) => {
      return {angle: subscriptionObj.payment, label: subscriptionObj.name, subLabel: `$ ${subscriptionObj.payment}`, color: colors[index]}
    })
  }

  render() {
    return (
      <Container>
        <h2>{this.props.month}</h2>
        <Container>
          <Row className="m-5">
            <RadialChart data={this.chartData()} width={400} height={400} showLabels={false} colorType={"literal"} />

            <div className="pl-5 pt-5">
            <DiscreteColorLegend items={this.chartData().map(d => d.label)} colors={
              ['#ff0000', '#0000ff', '#3cb371', '#ee82ee', '#ffa500', '#6a5acd',
              '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600',
              '#000099',	'#330099',	'#660099',	'#990099',	'#CC0099',	'#FF0099',
              '#003399',	'#333399',	'#663399',	'#993399',	'#CC3399',	'#FF3399',
              '#006699',	'#336699',	'#666699',	'#996699',	'#CC6699',	'#FF6699',
              '#009999',	'#339999',	'#669999',	'#999999',	'#CC9999',	'#FF9999',
              '#00CC99',	'#33CC99',	'#66CC99',	'#99CC99',	'#CCCC99',	'#FFCC99',
              '#00FF99',	'#33FF99',	'#66FF99',	'#99FF99',	'#CCFF99',	'#FFFF99',
              ]} />
            </div>
          </Row>
        </Container>
        <Container>
          <h4 className="mb-4">Due this month</h4>
          {this.props.subscriptions.length > 0 && this.showSubscriptions(this.props.monthCode)}
        </Container>
        <Row>
          <Col></Col>
          <Col>
            <h3>Total $ {this.getMonthlyTotal()}</h3>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MonthGraphView;
