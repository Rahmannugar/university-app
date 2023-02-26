import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

const CalendarDate = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="text-center mt-5">
        <span className="bold">Selected Date:</span> {date.toDateString()}.
      </p>
    </div>
  );
};

export default CalendarDate;
