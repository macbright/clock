import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./clock.css";



const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {   
        axios.get('http://worldtimeapi.org/api/timezone/America/New_York', )
        .then((response) => {
          setTime(new Date (new Date(response.data.datetime).toLocaleString("en-US", {timeZone: "America/New_York"})
          ));
          setTimezone(response.data.timezone)
        //   console.log('changed time', 
        //   new Date(response.data.datetime).toLocaleString("en-US", {timeZone: "America/New_York"})
        //   )
          console.log(response.data)
        }, (error) => {
          console.log(error);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("chekcing---", time)
  }, [time])

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  

  const hourStyle = {
    transform: `rotate(${((hour / 12) * 360) + ((minute/60)*30) + 90}deg)`,
  };

  const minuteStyle = {
    transform: `rotate(${((minute / 60) * 360) + ((second/60)*6) + 90}deg)`,
  };

  const secondStyle = {
    transform: `rotate(${((second / 60) * 360) + 90}deg)`,
  };


  return (
    <div className="container">
    <div className="clock">
        <div className="outer-clock-face">
            <div className="marking marking-one"></div>
            <div className="marking marking-two"></div>
            <div className="marking marking-three"></div>
            <div className="marking marking-four"></div>
            <div className="inner-clock-face"></div>
            <div className="hand hour-hand" style={hourStyle}></div>
            <div className="hand min-hand" style={minuteStyle}></div>
            <div className="hand second-hand" style={secondStyle}></div>
        </div>
    </div>
    <p>This Clock is currently showing time for {timezone} TIMEZONE</p>
    </div>
  );
};

export default Clock;
