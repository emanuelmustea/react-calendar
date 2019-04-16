
import React from 'react';
import {weekDays} from "../helpers/helpers"

export default function DaysNameList(props){
    const weekDaysDivs = weekDays.map(day=> <div key={day} className="day">{day}</div>)
    return (
        <div className="days-list flex row">
           {weekDaysDivs}
        </div>
    )
}