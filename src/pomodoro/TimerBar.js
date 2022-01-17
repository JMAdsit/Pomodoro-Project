import React from "react";

function TimerBar ({session, focusDuration, breakDuration}) {
  //Return nothing is there's no active session
  if (!session) {
    return null;
  }
  
  //Generate display time and timer bar
  let currentTime = session.timeRemaining;
  let currentMinutes = Math.floor(currentTime/60);
  let currentSeconds = currentTime%60;
  let currentTimeDisplay = ('0' + currentMinutes).slice(-2) + ":" + ('0' + currentSeconds).slice(-2)
  let currentMaxTime = session.label === "Focusing" ? ('0' + focusDuration).slice(-2) : ('0' + breakDuration).slice(-2)
  let valueBar = (((currentMaxTime * 60 - currentTime) / (currentMaxTime * 60)) * 100)
  
  //Render timer bar
  return       <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {session.label} for {currentMaxTime}:00 minutes
            </h2>
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
                aria-valuenow={valueBar}
                style={{ width: `${valueBar}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
}

export default TimerBar;