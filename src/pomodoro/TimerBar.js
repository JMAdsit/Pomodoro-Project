import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

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

export default TimerBar;