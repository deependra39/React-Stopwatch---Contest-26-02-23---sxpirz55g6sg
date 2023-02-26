import React, { useEffect, useRef, useState } from 'react';
import '../styles/App.css';

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const startTimer = () => {
    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime.current);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(Date.now() - startTime.current);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
  };

  const lapTimer = () => {
    const newLap = currentTime.toFixed(2);
    setLaps([...laps, newLap]);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formattedTime = new Date(currentTime).toISOString().slice(14, -1);

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{formattedTime}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>START</button>
          <button className="stop-btn" onClick={stopTimer}>STOP</button>
          <button className="lap-btn" onClick={lapTimer}>LAP</button>
          <button className="reset-btn" onClick={resetTimer}>RESET</button>
        </section>
      </section>
      <section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lap, index) => (
            <p key={index}>lap {index + 1}: {lap}</p>
          ))}
        </section>
      </section>
    </div>
  )
};

export default App;
