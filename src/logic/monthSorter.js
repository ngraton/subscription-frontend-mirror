
const allDueDateCalc = (dueDate, interval) => { 
  return []
}

nextDueDateCalc = (dueDate, interval) => {
  return 'date string'
}

const sortSubsByMonth(subscriptions){
  const monthlyReportArray = [[],[],[],[],[],[],[],[],[],[],[],[]];
  for (subscription in subscriptions){
    monthSorter(subscription, monthlyReportArray)
  }
}

const monthSorter = (subscription, monthlyReportArray) => {
  let currentMonth = new Date();
  currentMonth.setDate(0)
  let firstDueDate = new Date(subscription.due_date)
  while(currentMonth > firstDueDate){
    firstDueDate = nextDueDateCalc(subscription.due_date, subscription.interval)
  }
  const dueDateList = allDueDateCalc(firstDueDate, subscription.interval)
  for (date in dueDateList){
    const dueDate = new Date(date)
    const dueMonth = dueDate.getMonth()
    monthlyReportArray[dueMonth].push(subscription)
  }
}

export default {
  sortSubsByMonth: sortSubsByMonth,
}