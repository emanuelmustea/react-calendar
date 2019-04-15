import React from 'react';
import {monthNames} from "../helpers/helpers";

export default function CalendarHeader(props){
    const {viewMonth, viewYear, prevClick, nextClick} = props;
     return (<div className="header flex row">
     <button className="btn prev" onClick={prevClick}></button>
     <div className="row column auto-margin">{monthNames[viewMonth]} {viewYear}</div>
     <button className="btn next" onClick={nextClick}></button>
 </div>);
 }
 