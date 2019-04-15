import React, {Component} from 'react';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const getCurrentDateObject = (date) =>{
     return {month: date.getMonth(), year: date.getFullYear(), day: date.getDate()}
}

function CalendarHeader(props){
   const {viewMonth, viewYear, prevClick, nextClick} = props;
    return (<div className="header flex row">
    <button className="btn prev" onClick={prevClick}></button>
    <div className="row column auto-margin">{monthNames[viewMonth]} {viewYear}</div>
    <button className="btn next" onClick={nextClick}></button>
</div>);
}

function DaysNameList(props){
    return (
        <div className="days-list flex row">
            <div className="day">Sun</div>
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
        </div>
    )
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
class Calendar extends Component {

    constructor(props){
        super();
        const currentDate =  props.date || new Date();
        const dateObject = getCurrentDateObject(currentDate);
        this.state = {...dateObject, viewMonth: dateObject.month, viewYear: dateObject.year}
    }
    
    calculateDaysRows = () =>{
        const {viewMonth, viewYear} = this.state;
        console.log(this.state)
        const dayList = getMonthDays(viewMonth, viewYear);
        const splittedList = splitDaysToWeeks(dayList);
        return splittedList;
    }
    renderDaysRows = (week) =>{
        const {day:currentDay, month:currentMonth, year:currentYear} = this.state;
        const daysList = [];
        let i = 0
        for(let day of week){
            const previousClass = (day.previous) ? "previous" : "";
            const nextClass = (day.next) ? "next" : "";
            const currentDate = new Date(currentYear, currentMonth, currentDay);
            const activeClass = (currentDate.getTime() == day.date.getTime()) ? "active" : "";
            const dayClasses = `day ${previousClass} ${nextClass} ${activeClass}`;
            daysList.push(<div key={i} onClick={()=>this.changeActiveDay(day)} className={dayClasses}>{day.date.getDate()}</div>);
            i++;
        }
        return daysList;
    }
    prevMonth = () => {
        const {viewMonth: month, viewYear: year} = this.state
        const viewMonth = month === 0 ? 11 : month - 1;
        const viewYear = month === 0 ? year - 1 : year;
        this.setState({viewMonth, viewYear});
    }
    nextMonth = () => {
        const {viewMonth: month, viewYear: year} = this.state
        const viewMonth = month === 11 ? 0 : month + 1;
        const viewYear = month === 11 ? year + 1 : year;
        this.setState({viewMonth, viewYear});
    }
    changeActiveDay = (newDay) =>{
        const {day, month, year} = getCurrentDateObject(newDay.date);
        const {viewMonth, viewYear} = this.state;
        if(month > viewMonth || year > viewYear) this.nextMonth();
        if(month < viewMonth || year < viewYear) this.prevMonth();
        this.setState({day, month, year});
    }
    render() {
        const {day, viewMonth, viewYear} = this.state;
        const weeks = this.calculateDaysRows();
        const filledWeeks = fillMonthWithDays(weeks, viewMonth, viewYear);
        const weeksElement = filledWeeks.map((week, index) => <div key={index} className="days-row flex row justify-between">{this.renderDaysRows(week)}</div>)

        return (<div className="calendar">
            <CalendarHeader  {...{day,viewMonth, viewYear}} prevClick={this.prevMonth} nextClick={this.nextMonth} />
            <DaysNameList />
            <div className="days-table">
                {weeksElement}
            </div>
        </div>)
        }
}
export default Calendar;