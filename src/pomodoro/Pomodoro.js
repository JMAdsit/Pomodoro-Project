import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function TimerButtons ({session, focusDuration, setFocusDuration, breakDuration, setBreakDuration}) {
    return <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {('0' + focusDuration).slice(-2)}:00
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled={session}
                onClick={(event) => {
                  event.preventDefault();
                  setFocusDuration((focusDuration) => {if(focusDuration > 5) {return focusDuration - 5} else {return focusDuration}})
            }}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled={session}
                onClick={(event) => {
                  event.preventDefault();
                  setFocusDuration((focusDuration) => {if(focusDuration < 60) {return focusDuration + 5} else {return focusDuration}})
                }}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {('0' + breakDuration).slice(-2)}:00
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  disabled={session}
                  onClick={(event) => {
                    event.preventDefault();
                    setBreakDuration((breakDuration) => {if(breakDuration > 1) {return breakDuration - 1} else {return breakDuration}})
                  }}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  disabled={session}
                  onClick={(event) => {
                    event.preventDefault();
                    setBreakDuration((breakDuration) => {if(breakDuration < 15) {return breakDuration + 1} else {return breakDuration}})
                  }}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  }

function StartStopButtons ({playPause, isTimerRunning, handleStop, session, focusDuration, setFocusDuration, breakDuration, setBreakDuration}) {
  return <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              disabled={!session}
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
}

function TimerBar ({session, focusDuration, setFocusDuration, breakDuration, setBreakDuration}) {
  if (!session) {
    return null;
  }
  
  let currentTime = session.timeRemaining;
  let currentMinutes = Math.floor(currentTime/60);
  let currentSeconds = currentTime%60;
  let currentTimeDisplay = ('0' + currentMinutes).slice(-2) + ":" + ('0' + currentSeconds).slice(-2)
  let currentMaxTime = session.label === "Focusing" ? ('0' + focusDuration).slice(-2) : ('0' + breakDuration).slice(-2)
  let valueBar = (((currentMaxTime * 60 - currentTime) / (currentMaxTime * 60)) * 100)
  
  return       <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {session.label} for {currentMaxTime}:00 minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {currentTimeDisplay} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={valueBar} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${valueBar}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
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