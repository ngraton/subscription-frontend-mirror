import React, { Component } from 'react'
import MonthView from '../components/MonthView/MonthView'
class HomePage extends Component {
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
 

  render() {
    return (
      <div>
        {this.generateMonthLists()}
      </div>
    )
  }
}

export default HomePage
