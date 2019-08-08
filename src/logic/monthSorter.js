import DateCalculator from './DateCalculator';


const allDueDateCalc = (dueDate, interval) => {
  const dueDateArray = []
  if(interval === 'monthly'){

  }
  return dueDateArray
}

// nextDueDateCalc = (dueDate, interval) => {
//   return 'date string'
// }

const sortSubsByMonth = (subscriptions) => {
  const monthlyReportArray = [[],[],[],[],[],[],[],[],[],[],[],[]];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const sortedSubscriptions = {}
  for (let i = 0; i < subscriptions.length; i++) {
    monthSorter(subscriptions[i], monthlyReportArray)
  }
  for(let i =0; i < 12; i++){
    sortedSubscriptions[months[i]] = monthlyReportArray[i]
  }
  return sortedSubscriptions
}

const monthSorter = (subscription, monthlyReportArray) => {
  let currentMonth = new Date();
  currentMonth.setDate(0)
  let firstDueDate = new Date(subscription.due_date)
  // while(currentMonth > firstDueDate){
  //   firstDueDate = nextDueDateCalc(subscription.due_date, subscription.interval)
  // }
  // console.log(subscription.due_date , subscription.interval)
  const dueDateList = DateCalculator.recurringDates(subscription.due_date , subscription.interval)
  // console.log(dueDateList)
  for (let i = 0; i < dueDateList.length; i++) {
    // console.log(dueDateList[i])
    const dueDate = new Date(dueDateList[i])
    const dueMonth = dueDate.getMonth()
    subscription.dueInMonth = dueDateList[i]
    monthlyReportArray[dueMonth].push(subscription)
  }
}

export default {
  sortSubsByMonth: sortSubsByMonth,
}