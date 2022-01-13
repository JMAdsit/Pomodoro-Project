import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import TimerButtons from "./TimerButtons";
import StartStopButtons from "./StartStopButtons";
import TimerBar from "./TimerBar";
import nextTick from "./nextTick.js";
import nextSession from "./nextSession";


function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  /**
   * Custom hook that invokes the callback function every second
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }
  
    //End sessions when stop button is pushed
  function handleStop(event) {
    event.preventDefault();
    setIsTimerRunning(false);
    setSession(null);
  }
  
  
  return (
    <div className="pomodoro">
      <TimerButtons session={session} focusDuration={focusDuration} setFocusDuration={setFocusDuration} breakDuration={breakDuration} setBreakDuration={setBreakDuration} />
      <StartStopButtons playPause={playPause} isTimerRunning={isTimerRunning} handleStop={handleStop} session={session} focusDuration={focusDuration} setFocusDuration={setFocusDuration} breakDuration={breakDuration} setBreakDuration={setBreakDuration} />
     <TimerBar session={session} focusDuration={focusDuration} setFocusDuration={setFocusDuration} breakDuration={breakDuration} setBreakDuration={setBreakDuration} />
    </div>
  );
}

export default Pomodoro;