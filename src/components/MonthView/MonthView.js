import React, { Component } from 'react'

class MonthView extends Component {
  
  render() {
    return (
      <div>
        <h2>{this.props.month}</h2>
        
        <h3>Total $ </h3>
      </div>
    )
  }
}

export default MonthView
