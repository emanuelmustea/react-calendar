import React, {Component} from 'react';
import CalendarHeader from './Header';
import DaysNameList from "./NameList";

import {fillMonthWithDays, splitDaysToWeeks, getMonthDays, getCurrentDateObject} from "../helpers/helpers"

class Calendar extends Component {

    constructor(props){
        super();
        const currentDate =  props.date || new Date();
        const dateObject = getCurrentDateObject(currentDate);
        this.state = {...dateObject, viewMonth: dateObject.month, viewYear: dateObject.year}
    }
    
    calculateDaysRows = () =>{
        const {viewMonth, viewYear} = this.state;
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
            const activeClass = (currentDate.getTime() === day.date.getTime()) ? "active" : "";
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