import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import MonthView from '../components/MonthView/MonthView'
class HomePage extends Component {
  state = {
    loggedin: true
  }
  generateMonthLists() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date()
    let currentMonth = date.getMonth()
    let orderedMonths = months.slice(currentMonth)
    orderedMonths.push(...months.slice(0, currentMonth))
    return orderedMonths.map((month, index) => {
      return <MonthView key={index} month={month} />
    })
  }
  handleLogout(e) {
    this.setState({loggedin: false})
  }


  render() {
    return (
      <div>
        {this.state.loggedin === false && <Redirect to='/login'/>}
        <button onClick={(e)=>this.handleLogout(e)}>Logout</button>
        <Link to='/addsubscription'>Add New Subscription</Link>
        {this.generateMonthLists()}
      </div>
    )
  }
}

export default HomePage
