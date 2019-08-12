import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MonthView from '../components/MonthView/MonthView';
import UsersAPI from '../api/UsersAPI';
import monthSorter from '../logic/monthSorter';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, LabelSeries } from 'react-vis';
import { Row } from 'react-bootstrap';

class AnnualGraphPage extends Component {
  state = {
    loggedin: true,
    data: [],
    annualTotal: 0
  }

  componentDidMount() {
    if(localStorage.getItem('username')){
      UsersAPI.getUserByUsername(localStorage.getItem('username'))
        .then(response => response[0].subscriptions)
          .then(subscriptions => monthSorter.sortSubsByMonth(subscriptions))
            .then(sortedSubs => this.setState({subscriptions: sortedSubs}))
              .then(_res => this.generateMonthLists())
    }
  }

  generateMonthLists() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date()
    let currentMonth = date.getMonth()
    let orderedMonths = months.slice(currentMonth)
    orderedMonths.push(...months.slice(0, currentMonth))

    orderedMonths.map((month) => {
      let totalCost = 0
      for (let i=0; i < this.state.subscriptions[month].length; i++){
        let subscription = this.state.subscriptions[month][i]
        totalCost += subscription.payment
      }
      this.setState({data: [...this.state.data, {x: month, y: totalCost}]})
      this.setState({annualTotal: this.state.annualTotal + totalCost})
    })
  }

  render() {
    return (
      <div>
        {this.state.loggedin === false && <Redirect to='/login'/>}
        <Row className="justify-content-center">
          <h2 className="pt-2 pb-3">Annual Total ${this.state.annualTotal}</h2>
          <XYPlot height={600} width={800} xType="ordinal" margin={{left: 50, right: 50, top: 40, bottom: 40}}>
            <VerticalBarSeries data={this.state.data} />
            <XAxis />
            <YAxis />
            <LabelSeries data={this.state.data.map(obj => {return {...obj, label: `$${obj.y.toString()}`}})} labelAnchorX="middle" labelAnchorY="text-after-edge"/>
          </XYPlot>
        </Row>
      </div>
    )
  }
}

export default AnnualGraphPage;
