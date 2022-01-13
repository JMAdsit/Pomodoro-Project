import React from "react";

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

export default TimerButtons;