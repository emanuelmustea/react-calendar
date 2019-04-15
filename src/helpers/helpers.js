const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const getCurrentDateObject = (date) =>{
     return {month: date.getMonth(), year: date.getFullYear(), day: date.getDate()}
}

const getMonthDays = (month, year) =>{
    if(month == -1 ){
        month = 11;
        year--;
    }
    if(month == 12 ){
        month = 0;
        year++;
    }
    const date = new Date(year, month, 1);
    const days = new Array();
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days.map(day => ({date: day}));
}
const splitDaysToWeeks = (daysArray) =>{
    const weeksArray = [];
    let currentWeek = 0;
    for(const day of daysArray){
        if(!weeksArray[currentWeek]){
            weeksArray.push(new Array());
        }
        weeksArray[currentWeek].push(day);
        if(day.date.getDay() === 6){
            currentWeek++;
        }
    }
    return weeksArray;
}
const fillMonthWithDays = (weeksArray, month, year) => {
    const weeks = weeksArray;
    if(weeks[0].length < 7){
        const previousMonthDays = getMonthDays(month - 1, year);
        const daysNeeded  = 7 - weeks[0].length;
        const daysNeededArray = previousMonthDays.slice((-1) * daysNeeded);
        const markedDays = daysNeededArray.map(day => ({previous:true, ...day}));
        weeks[0] = [ ...markedDays, ...weeks[0]];
    }
    if(weeks[weeks.length - 1].length < 7){
        const previousMonthDays = getMonthDays(month + 1, year);
        const daysNeeded  = 7 - weeks[weeks.length - 1].length;
        const daysNeededArray = previousMonthDays.slice(0, daysNeeded);
        const markedDays = daysNeededArray.map(day => ({next:true, ...day}));
        weeks[weeks.length - 1] = [ ...weeks[weeks.length - 1], ...markedDays];
    }
return weeks;
}
export {fillMonthWithDays, splitDaysToWeeks, getMonthDays, getCurrentDateObject, monthNames}