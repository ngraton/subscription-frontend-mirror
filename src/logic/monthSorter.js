
// import DateCalculator from './DateCalculator';

const dateInLocalTZ = (dateString) => {
  const dueDate = new Date(dateString)
    const diffUTC = dueDate.getHours() - 12
    diffUTC > 0 ? dueDate.setHours(24) : dueDate.setHours(0)
    return dueDate
}

const dueDateCalc = (dueDateString, intervalString) => {
  const dueDate = dateInLocalTZ(dueDateString)
  const nowDate = new Date()
  const currentMonth = nowDate.getMonth()
  const monthStart = nowDate.setDate(1)
  const dateList = []
  var increment = 1
  if(intervalString !== 'monthly') {
    intervalString === 'annual' ? increment = 12 : increment = 4;
  }
  while(monthStart > dueDate){
    dueDate.setMonth(currentMonth + increment)
  }
  dateList.push(dueDate)
  let nextMonth = dueDate.getMonth()
  for(let i = 1; i < 12/increment; i++){
    let monthMod = nextMonth+(increment*i)
    dateList.push(getDueDate(monthMod, dueDate))
  }
  return dateList
}

const getDueDate = (monthCode, date) => {
  let dueDate =  new Date(date)
  dueDate.setMonth(monthCode)
  let realMonthCode = monthCode > 11 ? monthCode - 12 : monthCode
  if(dueDate.getMonth() !== realMonthCode) {
  dueDate.setDate(0)
  } 
  return dueDate
}

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

  const dueDateList = dueDateCalc(subscription.due_date , subscription.interval)

  for (let i = 0; i < dueDateList.length; i++) {
    const dueDate = dateInLocalTZ(dueDateList[i])
    const dueMonth = dueDate.getMonth()
    monthlyReportArray[dueMonth].push(subscription)
  }
}

export default {
  sortSubsByMonth: sortSubsByMonth,
}